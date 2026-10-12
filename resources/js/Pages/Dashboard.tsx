import { Head, InfiniteScroll, Link, router, usePage } from '@inertiajs/react'
import { ReactElement, useRef, useState } from 'react'
import { route } from 'ziggy-js'
import AppLayout from '@/Layouts/AppLayout'
import BudgetScrollGrid from '@/Components/BudgetScrollGrid'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import BudgetCard from '@/Components/BudgetCard'
import { DashboardBudget } from '@/types/budget'
import { PlusIcon, CalendarCheckIcon, CalendarClockIcon, Trash2Icon } from "@animateicons/react/lucide"
import type { PlusIconHandle, CalendarClockIconHandle, CalendarCheckIconHandle, Trash2IconHandle } from "@animateicons/react/lucide"
import TrashedBudgetCard from '@/Components/TrashedBudgetCard'
import DeleteBudgetModal from '@/Components/DeleteBudgetModal'
import WelcomeProModal from '@/Components/WelcomeAiModal'
import DashboardHeader from '@/Components/DashboardHeader'
import DashboardEmpty from '@/Components/DashboardEmpty'

type Props = {
    activeBudgets: { data: DashboardBudget[] }
    finishedBudgets: { data: DashboardBudget[] }
    trashedBudgets: DashboardBudget[]
    summary: {
        active: number
        managed: string
        spent: string
        attention: number
        finished: number
    }
}

export default function Dashboard({ activeBudgets, finishedBudgets, trashedBudgets, summary }: Props) {
    const hasNoBudgets = summary.active === 0 && summary.finished === 0 && trashedBudgets.length === 0
    const PlusIconRef = useRef<PlusIconHandle>(null)
    const ActiveIconRef = useRef<CalendarClockIconHandle>(null)
    const FinishedIconRef = useRef<CalendarCheckIconHandle>(null)
    const TrashIconRef = useRef<Trash2IconHandle>(null)

    const tabs = [
        { key: 'active', label: 'Activos', count: summary.active },
        { key: 'finished', label: 'Finalizados', count: summary.finished },
        { key: 'trash', label: 'Papelera', count: trashedBudgets.length },
    ]

    const { url } = usePage()
    const initialTab = new URLSearchParams(url.split('?')[1] ?? '').get('tab')

    const [selectedIndex, setSelectedIndex] = useState(() =>
        Math.max(0, tabs.findIndex((tab) => tab.key === initialTab))
    )

    const handleTabChange = (index: number) => {
        setSelectedIndex(index)

        const key = tabs[index].key

        router.replace({
            url: route('dashboard', key === 'active' ? {} : { tab: key }),
            preserveScroll: true,
            preserveState: true,
            viewTransition: false,
        })
    }

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

                        <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange}>
                            <TabList className="flex gap-6 border-b border-border-soft/40">
                                <Tab
                                    onMouseEnter={() => ActiveIconRef.current?.startAnimation()}
                                    onMouseLeave={() => ActiveIconRef.current?.stopAnimation()}
                                    className="group -mb-px flex items-center gap-2 border-b-2 border-transparent pb-2.5 text-sm font-semibold text-muted outline-none transition-colors cursor-pointer data-hover:text-ink data-selected:border-accent data-selected:text-ink data-focus:text-ink"
                                >
                                    <CalendarClockIcon ref={ActiveIconRef} size={16} duration={1} color="currentColor" />
                                    {tabs[0].label}
                                    <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs font-bold text-ink transition-colors group-data-selected:bg-ink group-data-selected:text-surface">
                                        {tabs[0].count}
                                    </span>
                                </Tab>

                                <Tab
                                    onMouseEnter={() => FinishedIconRef.current?.startAnimation()}
                                    onMouseLeave={() => FinishedIconRef.current?.stopAnimation()}
                                    className="group -mb-px flex items-center gap-2 border-b-2 border-transparent pb-2.5 text-sm font-semibold text-muted outline-none transition-colors cursor-pointer data-hover:text-ink data-selected:border-accent data-selected:text-ink data-focus:text-ink"
                                >
                                    <CalendarCheckIcon ref={FinishedIconRef} size={16} duration={1} color="currentColor" />
                                    {tabs[1].label}
                                    <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs font-bold text-ink transition-colors group-data-selected:bg-ink group-data-selected:text-surface">
                                        {tabs[1].count}
                                    </span>
                                </Tab>

                                <Tab
                                    aria-label="Papelera"
                                    onMouseEnter={() => TrashIconRef.current?.startAnimation()}
                                    onMouseLeave={() => TrashIconRef.current?.stopAnimation()}
                                    className="group -mb-px flex items-center gap-2 border-b-2 border-transparent pb-2.5 text-sm font-semibold text-muted outline-none transition-colors cursor-pointer data-hover:text-ink data-selected:border-accent data-selected:text-ink data-focus:text-ink"
                                >
                                    <Trash2Icon ref={TrashIconRef} size={16} duration={1} color="currentColor" />
                                    <span className="hidden sm:inline">{tabs[2].label}</span>
                                    <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs font-bold text-ink transition-colors group-data-selected:bg-ink group-data-selected:text-surface">
                                        {tabs[2].count}
                                    </span>
                                </Tab>
                            </TabList>

                            <TabPanels className="mt-4">
                                <TabPanel className="focus:outline-none transition duration-200 ease-out starting:opacity-0 starting:translate-y-1 motion-reduce:transition-none">
                                    <p className="mb-4 text-sm text-muted">En curso o sin fecha de cierre.</p>

                                    <BudgetScrollGrid data="activeBudgets" loadedCount={activeBudgets.data.length}>
                                        {activeBudgets.data.map((budget) => (
                                            <BudgetCard key={budget.id} budget={budget} />
                                        ))}

                                        <Link
                                            href="/budgets/create"
                                            onMouseEnter={() => PlusIconRef.current?.startAnimation()}
                                            onMouseLeave={() => PlusIconRef.current?.stopAnimation()}
                                            className="order-first sm:order-last border border-dashed border-border-soft rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-muted hover:border-accent/40 hover:text-accent transition-colors min-h-35"
                                        >
                                            <PlusIcon ref={PlusIconRef} size={20} duration={1} color="currentColor" />
                                            <p className="text-sm">Crear presupuesto</p>
                                        </Link>
                                    </BudgetScrollGrid>
                                </TabPanel>

                                <TabPanel className="focus:outline-none transition duration-200 ease-out starting:opacity-0 starting:translate-y-1 motion-reduce:transition-none">
                                    <p className="mb-4 text-sm text-muted">
                                        Su fecha de finalización ya pasó. Puedes consultarlos o editarlos cuando quieras.
                                    </p>

                                    {summary.finished > 0 ? (
                                        <BudgetScrollGrid data="finishedBudgets" loadedCount={finishedBudgets.data.length}>
                                            {finishedBudgets.data.map((budget) => (
                                                <BudgetCard key={budget.id} budget={budget} finished />
                                            ))}
                                        </BudgetScrollGrid>
                                    ) : (
                                        <div className="rounded-xl border border-dashed border-border-soft p-10 text-center text-sm text-muted">
                                            Aún no tienes presupuestos finalizados. Aparecerán aquí cuando pase su fecha de cierre.
                                        </div>
                                    )}
                                </TabPanel>

                                <TabPanel className="focus:outline-none transition duration-200 ease-out starting:opacity-0 starting:translate-y-1 motion-reduce:transition-none">
                                    <p className="mb-4 text-sm text-muted">
                                        Los presupuestos que eliminas se guardan aquí 30 días. Después se eliminan definitivamente junto con sus gastos.
                                    </p>

                                    {trashedBudgets.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {trashedBudgets.map((budget) => (
                                                <TrashedBudgetCard key={budget.id} budget={budget} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-xl border border-dashed border-border-soft p-10 text-center text-sm text-muted">
                                            La papelera está vacía.
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
