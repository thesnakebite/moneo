import { FacebookIcon, InstagramIcon, PiggyBankIcon, TwitterIcon } from "@animateicons/react/lucide"

export default function Footer() {
    return (
        <footer className="bg-accent-dark/95 border-t border-accent px-6 pt-8 md:px-16 lg:px-36 w-full text-surface">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-accent pb-10">

                <div className="md:max-w-96">
                    <div className="flex items-center font-extralight gap-3">
                        <PiggyBankIcon
                            size={44}
                            duration={1}
                            color="var(--color-accent)"
                        />
                        <span className="text-[40px] font-unique-medium text-surface">Moneo</span>
                    </div>
                    <p className="mt-6 text-sm">
                        Organiza tus presupuestos, registra gastos al instante y deja que la IA te eche una mano cuando lo necesites.
                    </p>
                    <div className="flex gap-3 mt-2">
                        <a href="#" aria-label="X (Twitter)">
                            <TwitterIcon size={20} duration={1} color="var(--color-surface)" />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <InstagramIcon size={20} duration={1} color="var(--color-surface)" />
                        </a>
                        <a href="#" aria-label="Facebook">
                            <FacebookIcon size={20} duration={1} color="var(--color-surface)" />
                        </a>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <img src="/images/googlePlayBtn.svg" alt="google play" className="h-10 w-auto border border-surface rounded" />
                        <img src="/images/appleStoreBtnBlack.svg" alt="app store" className="h-10 w-auto border border-surface rounded" />
                    </div>
                </div>

                <div className="flex-1 flex items-start md:justify-end gap-20 lg:gap-36 xl:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">Compañía</h2>
                        <ul className="text-sm">
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Quiénes somos</a></li>
                            <li><a href="#">Contacto</a></li>
                            <li><a href="#">Política de Privacidad</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-5">Ponte en contacto</h2>
                        <div className="text-sm space-y-2">
                            <p>soporte@moneo.es</p>
                            <p className="text-sm text-surface/60">Lun-Vie, 9:00-18:00</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} @ <a href="#">Moneo</a>. Todos los derechos reservados.
            </p>
        </footer>
    )
}
