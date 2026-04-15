from rest_framework.response import Response


class SuccessEnvelopeMixin:
    def success_response(self, data, status=200, headers=None):
        return Response({"success": True, "data": data}, status=status, headers=headers)

