import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import { ReactElement } from 'react'

export default function Privacy() {
    return (
        <>
            <Head title='Política de privacidad' />

            <article className="max-w-2xl mx-auto py-10">
                <h1 className="text-3xl font-bold text-ink">Política de privacidad</h1>
                <p className="mt-2 text-sm text-muted">Última actualización: 5 de octubre de 2026</p>

                <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_p+p]:mt-2">
                    <section>
                        <h2>1. Responsable del tratamiento</h2>
                        <ul>
                            <li>Titular: Álvaro Navarro (thesnakebite)</li>
                            <li>NIF: 46059375N</li>
                            <li>Domicilio: Carrer Joan Llampallas, 35, local, 08320, Barcelona</li>
                            <li>Email: alvaro@thesnakebite.es</li>
                        </ul>
                        <p className="mt-2.5">Moneo es un proyecto de estudio personal en desarrollo.</p>
                    </section>

                    <section>
                        <h2>2. Qué datos tratamos</h2>
                        <ul>
                            <li>Datos de cuenta: nombre, email y contraseña (guardada cifrada).</li>
                            <li>Foto de perfil, si decides subirla.</li>
                            <li>Presupuestos y gastos que registras: nombres, importes, categorías y fechas.</li>
                            <li>Imágenes de tickets que envías para su escaneo.</li>
                            <li>
                                Datos de suscripción: identificador de cliente y estado del plan. Los datos de tu tarjeta
                                los gestiona Stripe y Moneo no los almacena.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Para qué los usamos</h2>
                        <p>
                            Para darte acceso a tu cuenta, guardar y mostrar tus presupuestos, gestionar tu suscripción
                            y, si eres suscriptor, ofrecerte el asistente de IA y el escaneo de tickets. No usamos tus
                            datos con fines publicitarios ni los vendemos.
                        </p>
                    </section>

                    <section>
                        <h2>4. Servicios de terceros</h2>
                        <ul>
                            <li>Stripe: procesa los pagos de la suscripción.</li>
                            <li>
                                Proveedor de IA: cuando usas el asistente o escaneas un ticket, tu mensaje, los gastos
                                del presupuesto y la imagen del ticket se envían a un proveedor de inteligencia
                                artificial ubicado en Estados Unidos.
                            </li>
                            <li>Servicio de correo: envía los emails de verificación y de recuperación de contraseña.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Cookies</h2>
                        <p>
                            Moneo solo usa cookies técnicas, necesarias para mantener tu sesión y proteger los
                            formularios. No usa cookies de análisis ni de publicidad.
                        </p>
                    </section>

                    <section>
                        <h2>6. Cuánto tiempo los conservamos</h2>
                        <p>
                            Mientras tu cuenta esté activa. Si la eliminas, se borran tus datos, presupuestos, gastos
                            y foto de perfil. Solo se conserva tu email junto al motivo de baja que indiques, si
                            decides indicarlo.
                        </p>
                    </section>

                    <section>
                        <h2>7. Tus derechos</h2>
                        <p>
                            Puedes acceder a tus datos, corregirlos o eliminar tu cuenta desde los ajustes de tu
                            perfil. Para cualquier otra solicitud, escribe a soporte@moneo.es. También puedes
                            presentar una reclamación ante la Agencia Española de Protección de Datos.
                        </p>
                    </section>
                </div>
            </article>
        </>
    )
}

Privacy.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
