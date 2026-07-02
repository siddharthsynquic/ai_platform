"""Site Agent domain enums — per brief §3."""

from enum import StrEnum


class IssueType(StrEnum):
    STRUCTURAL = "structural"
    MEP = "mep"
    ENVELOPE = "envelope"
    FINISHING = "finishing"
    COMPLIANCE = "compliance"
    COORDINATION = "coordination"
    SAFETY = "safety"
    MATERIAL_QUALITY = "material_quality"


class Severity(StrEnum):
    CRITICAL = "critical"
    MAJOR = "major"
    MINOR = "minor"
    OBSERVATION = "observation"
    POSITIVE_NOTE = "positive_note"


class ObservationStatus(StrEnum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    VERIFIED = "verified"
    ESCALATED = "escalated"


class Trade(StrEnum):
    CIVIL = "civil"
    ELECTRICAL = "electrical"
    PLUMBING = "plumbing"
    HVAC = "hvac"
    FIRE = "fire"
    FACADE = "facade"
    INTERIOR = "interior"


class ConstructionPhase(StrEnum):
    """Construction lifecycle phase (Site Agent scope — NOT drawing stage)."""

    FOUNDATION = "foundation"
    STRUCTURE = "structure"
    SERVICES_ROUGH_IN = "services_rough_in"
    ENVELOPE = "envelope"
    FINISHING = "finishing"
    HANDOVER = "handover"


class ResponsibleParty(StrEnum):
    CONTRACTOR = "contractor"
    SUB_CONTRACTOR = "sub_contractor"
    CONSULTANT = "consultant"
    SITE_SUPERVISOR = "site_supervisor"
    ARCHITECT = "architect"


class SiteRole(StrEnum):
    SITE_AGENT = "site_agent"
    PROJECT_ARCHITECT = "project_architect"
    ADMIN = "admin"


class InputType(StrEnum):
    PHOTO = "photo"
    VOICE = "voice"
    TEXT = "text"


class ReportType(StrEnum):
    DAILY = "daily"
    WEEKLY = "weekly"
    ISSUE_SPECIFIC = "issue_specific"
    SNAG_LIST = "snag_list"
    CUSTOM = "custom"
