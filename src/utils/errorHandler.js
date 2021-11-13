import { toast } from 'react-toastify';

export const Success = res => {
    switch(res.status) {
        case 200:
            toast.success(res.data.message);
        break;

        case 201:
            toast.success(res.data.message);
        break;
    }
}

export const Error = err => {
    switch (err.response.status) {
        //
        case 422:
            if (Object.keys(err.response.data.errors).length !== null) {
                const errCount = Object.keys(err.response.data.errors).length;
                const errValue = Object.values(err.response.data.errors);
                for (let i = 0; i < errCount; i++) {
                    toast.error(errValue[i][0]);
                }
            }
        break;
        //    
        case 401:
            toast.warning(err.response.data.message)
        break;
        //
        case 403:
            if (err.response.data.errors !== null) {
                for (let i = 0; i < err.response.data.errors.length; i++) {
                    toast.warning(err.response.data.errors[i].message)
                }
            } else {
                toast.warning(err.response.data.message)
            }
        break;
        //
        case 404:
            toast.warning('Forbidden!')
        break;
        //
        case 500:
            toast.warning('Service is Unavailable!')
        break;
        //
        case 503:
            toast.warning('Your are disconnected!')
        break;
        //
        default:
            toast.warning('Your are disconnected!');
        break;
    }
};