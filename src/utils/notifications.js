import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const showSuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
    })
}

export const showError = (message) => {
    toast.error(message, {
        position: "top-right",
        timeout: 4000,
    })
}