from rest_framework.views import exception_handler


def api_exception_handler(exc, context):
    """
    Wrap DRF errors into a predictable envelope:
    { "success": false, "error": { "code": "...", "message": "...", "details": ... } }
    """
    response = exception_handler(exc, context)
    if response is None:
        return response

    detail = response.data
    response.data = {
        "success": False,
        "error": {
            "code": "validation_error" if response.status_code == 400 else "error",
            "message": "Request failed.",
            "details": detail,
        },
    }
    return response

