import { ReactNode } from "react";

export default function InputError({children}: {children: ReactNode}) {
    return (
        <p className="text-red-500 text-xs">{children}</p>
    )
}
