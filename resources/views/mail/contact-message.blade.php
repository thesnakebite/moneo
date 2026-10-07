<x-mail::message>
# Nuevo mensaje de contacto

Has recibido un mensaje desde el formulario de contacto de Moneo.

**Nombre:** {{ $name }}

**Email:** {{ $email }}

<x-mail::panel>
{!! nl2br(e($messageBody)) !!}
</x-mail::panel>

<x-mail::button :url="'mailto:' . $email">
Responder a {{ $name }}
</x-mail::button>

Enviado el {{ now('Europe/Madrid')->format('d.m.Y') }} a las {{ now('Europe/Madrid')->format('H:i') }}.
</x-mail::message>
