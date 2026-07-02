"""Site chatbot service — RAG-grounded conversational queries over observations + drawings.

Flow (per brief §3.5):
1. Parse intent (issue_lookup | status_check | trend | precedent | report_request | ...)
2. Extract entities (floor, trade, date range, severity)
3. Hybrid retrieve from site_observations + validation_history + standard_details
4. LlmProvider.generate with citations
5. Return grounded answer + source references
"""

# TODO: implement.
