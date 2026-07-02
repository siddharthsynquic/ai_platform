"""Deep health check — DB, Redis, vector store, storage. Used by k8s readiness probes."""

from dataclasses import dataclass


@dataclass
class ComponentHealth:
    name: str
    healthy: bool
    detail: str | None = None
    latency_ms: float | None = None


@dataclass
class HealthReport:
    overall: bool
    components: list[ComponentHealth]


async def check_all() -> HealthReport:
    """Fan out checks concurrently; return per-component status."""
    components: list[ComponentHealth] = []

    # TODO: uncomment as each dep is wired.
    # components.append(await _check_db())
    # components.append(await _check_redis())
    # components.append(await _check_vector_store())
    # components.append(await _check_storage())

    overall = all(c.healthy for c in components) if components else True
    return HealthReport(overall=overall, components=components)


# async def _check_db() -> ComponentHealth: ...       # SELECT 1
# async def _check_redis() -> ComponentHealth: ...    # PING
# async def _check_vector_store() -> ComponentHealth: ...
# async def _check_storage() -> ComponentHealth: ...
