from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal, engine
import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "HRMS Lite API Running"}


# ---------------- EMPLOYEE ----------------

@app.post("/employees", response_model=schemas.EmployeeResponse)
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):

    existing = db.query(models.Employee).filter(
        (models.Employee.employee_id == employee.employee_id) |
        (models.Employee.email == employee.email)
    ).first()

    if existing:
        raise HTTPException(status_code=409, detail="Employee already exists")

    new_emp = models.Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )

    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)
    return new_emp


@app.get("/employees", response_model=list[schemas.EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()


@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):

    emp = db.query(models.Employee).filter(models.Employee.id == emp_id).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted successfully"}


# ---------------- ATTENDANCE ----------------

@app.post("/attendance", response_model=schemas.AttendanceResponse)
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):

    emp = db.query(models.Employee).filter(models.Employee.employee_id == att.employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    existing = db.query(models.Attendance).filter(
        models.Attendance.employee_id == att.employee_id,
        models.Attendance.date == att.date
    ).first()

    if existing:
        existing.status = att.status
        db.commit()
        db.refresh(existing)
        return existing

    new_att = models.Attendance(
        employee_id=att.employee_id,
        date=att.date,
        status=att.status
    )

    db.add(new_att)
    db.commit()
    db.refresh(new_att)
    return new_att


@app.get("/attendance/{employee_id}", response_model=list[schemas.AttendanceResponse])
def get_attendance(employee_id: str, db: Session = Depends(get_db)):

    records = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()

    return records
