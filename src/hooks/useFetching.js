import { useState } from "react"
/*
Кастомный хук для объединения логики запроса данных,
 анимации загрузки и обработки ошибок
*/


export const useFetching = (callback) => {
    // тут callback - некая асинхронная ф() запроса данных
    //стейт отвечающий за загрузку 
    const [isLoadind, setIsLoading] = useState(false)
    //стейт хранения ошибки 
    const [error, setError] = useState()

    // функция загрузки и обработки ошибок
    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }
    // возвращается массив который потом удобно деструктуризировать гдето
    // 1й - ф(), 2й - флаг загрузки, чтобы повесить крутилку, 3й текст ошибки

    return [fetching, isLoadind, error]
}
