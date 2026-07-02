"""Site Agent conversational chatbot endpoints — grounded RAG over observations."""

from fastapi import APIRouter

router = APIRouter(prefix="/site/chat", tags=["site-chat"])

# TODO:
# POST /site/chat/query          → natural language query → grounded answer + citations
# POST /site/chat/sessions       → new conversation session
# GET  /site/chat/sessions/{id}  → conversation history
