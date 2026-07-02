"""Site observation DTOs."""

from datetime import datetime

from pydantic import BaseModel, Field

from app.domain.site.enums import (
    ConstructionPhase,
    InputType,
    IssueType,
    ObservationStatus,
    ResponsibleParty,
    Severity,
    Trade,
)


class ObservationCreate(BaseModel):
    project_id: str
    input_type: InputType
    title: str | None = None
    description: str | None = None
    issue_type: IssueType | None = None
    severity: Severity = Severity.OBSERVATION
    trade: Trade | None = None
    construction_phase: ConstructionPhase | None = None
    responsible_party: ResponsibleParty | None = None
    floor_level: str | None = None
    zone: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    pin: "PinPayload | None" = None


class PinPayload(BaseModel):
    floor_plan_pdf_id: str
    page_number: int = Field(ge=1)
    x_ratio: float = Field(ge=0, le=1)
    y_ratio: float = Field(ge=0, le=1)


class ObservationResponse(BaseModel):
    id: str
    project_id: str
    captured_by_user_id: str | None
    input_type: InputType
    title: str | None
    description: str | None
    issue_type: IssueType | None
    severity: Severity
    status: ObservationStatus
    trade: Trade | None
    construction_phase: ConstructionPhase | None
    responsible_party: ResponsibleParty | None
    floor_level: str | None
    zone: str | None
    captured_at: datetime
    resolved_at: datetime | None = None


ObservationCreate.model_rebuild()
