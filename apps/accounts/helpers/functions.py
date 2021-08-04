import functools


def hash_password_decorator(method):
    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        updated_user = method(self, *args, **kwargs)
        validated_data = kwargs.get('validated_data', args[-1])
        if 'password' in validated_data:
            updated_user.set_password(validated_data['password'])
            updated_user.save()
        return updated_user
    return wrapper
