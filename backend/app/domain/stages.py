"""Project stage enum — SD / DD / GFC. Foundational domain concept."""

from enum import StrEnum


class ProjectStage(StrEnum):
    SD = "SD"   # Schematic Design — spatial logic, design intent
    DD = "DD"   # Design Development — dimensions, drafting quality
    GFC = "GFC" # Good for Construction — precision, production readiness
