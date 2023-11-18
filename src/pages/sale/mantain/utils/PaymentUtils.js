import { formatMessage } from 'umi-plugin-react/locale';


export const paymentMethods = [
{code:'CAH_ON_DELIVERY',description:formatMessage({ id: 'payment.method.cash'})},
{code:'MPESA',description:formatMessage({ id: 'payment.method.mpesa'})},
{code:'BANK_TRANSFER',description:formatMessage({ id: 'payment.method.bank'})},
{code:'PAYPAL',description:formatMessage({ id: 'payment.method.paypal'})},

]