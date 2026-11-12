const EXPENSE =
  "bg-rose-50 text-rose-900 border-rose-100 dark:bg-rose-500/10 dark:text-rose-200 dark:border-rose-500/20"
const INCOME =
  "bg-emerald-50 text-emerald-900 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20"

export function movementTone(money) {
  return Number(money) < 0 ? EXPENSE : INCOME
}
