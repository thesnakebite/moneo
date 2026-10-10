import { Head, Link } from '@inertiajs/react'
import { ReactElement, useRef } from 'react'
import AppLayout from '@/Layouts/AppLayout'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import BudgetCard from '@/Components/BudgetCard'
import { Budget } from '@/types/budget'
import { PlusIcon } from "@animateicons/react/lucide"
import type { PlusIconHandle } from "@animateicons/react/lucide"
import DeleteBudgetModal from '@/Components/DeleteBudgetModal'
import WelcomeProModal from '@/Components/WelcomeAiModal'
import DashboardHeader from '@/Components/DashboardHeader'
import DashboardEmpty from '@/Components/DashboardEmpty'

type Props = {
    activeBudgets: Budget[]
    finishedBudgets: Budget[]
    summary: {
        managed: string
        spent: string
        attention: number
        finished: number
    }
}

export default function Dashboard({ activeBudgets, finishedBudgets, summary }: Props) {
    const hasNoBudgets = activeBudgets.length === 0 && finishedBudgets.length === 0
    const PlusIconRef = useRef<PlusIconHandle>(null)

    const tabs = [
        { label: 'Activos', count: activeBudgets.length },
        { label: 'Finalizados', count: finishedBudgets.length }
    ]

    return (
        <>
            <Head title="Tus presupuestos" />

            <div className="max-w-5xl mx-auto">
                {hasNoBudgets ? (
                    <DashboardEmpty />
                ) : (
                    <>
                        <DashboardHeader
                            managed={summary.managed}
                            spent={summary.spent}
                            attention={summary.attention}
                            finished={summary.finished}
                        />

                        <TabGroup>
                            <TabList className="flex gap-6 border-b border-border-soft/40">
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.label}
                                        className="group -mb-px flex items-center gap-2 border-b-2 border-transparent pb-2.5 text-sm font-semibold text-muted outline-none transition-colors cursor-pointer data-hover:text-ink data-selected:border-accent data-selected:text-ink data-focus:text-ink"
                                    >
                                        {tab.label}
                                        <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs font-bold text-ink transition-colors group-data-selected:bg-ink group-data-selected:text-surface">
                                            {tab.count}
                                        </span>
                                    </Tab>
                                ))}
                            </TabList>

                            <TabPanels className="mt-4">
                                <TabPanel className="focus:outline-none transition duration-200 ease-out starting:opacity-0 starting:translate-y-1 motion-reduce:transition-none">
                                    <p className="mb-4 text-sm text-muted">En curso o sin fecha de cierre.</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {activeBudgets.map((budget) => (
                                            <BudgetCard key={budget.id} budget={budget} />
                                        ))}

                                        <Link
                                            href="/budgets/create"
                                            onMouseEnter={() => PlusIconRef.current?.startAnimation()}
                                            onMouseLeave={() => PlusIconRef.current?.stopAnimation()}
                                            className="border border-dashed border-border-soft rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-muted hover:border-accent/40 hover:text-accent transition-colors min-h-35"
                                        >
                                            <PlusIcon ref={PlusIconRef} size={20} duration={1} color="currentColor" />
                                            <p className="text-sm">Crear presupuesto</p>
                                        </Link>
                                    </div>
                                </TabPanel>

                                <TabPanel className="focus:outline-none transition duration-200 ease-out starting:opacity-0 starting:translate-y-1 motion-reduce:transition-none">
                                    <p className="mb-4 text-sm text-muted">
                                        Su fecha de finalización ya pasó. Puedes consultarlos o editarlos cuando quieras.
                                    </p>

                                    {finishedBudgets.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {finishedBudgets.map((budget) => (
                                                <BudgetCard key={budget.id} budget={budget} finished />
                                            ))}
                                        </div>

                                    ) : (
                                        <div className="rounded-xl border border-dashed border-border-soft p-10 text-center text-sm text-muted">
                                            Aún no tienes presupuestos finalizados. Aparecerán aquí cuando pase su fecha de cierre.
                                        </div>
                                    )}
                                </TabPanel>

                            </TabPanels>
                        </TabGroup>
                    </>
                )}
            </div>

            <DeleteBudgetModal />
            <WelcomeProModal />
        </>
    )
}

Dashboard.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
