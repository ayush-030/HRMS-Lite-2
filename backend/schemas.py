from pydantic import BaseModel, EmailStr

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeResponse(EmployeeCreate):
    id: int
    class Config:
        from_attributes = True


class AttendanceCreate(BaseModel):
    employee_id: str
    date: str
    status: str

class AttendanceResponse(AttendanceCreate):
    id: int
    class Config:
        from_attributes = True
