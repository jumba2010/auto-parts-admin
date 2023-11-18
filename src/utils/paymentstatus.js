import { formatMessage } from 'umi-plugin-react/locale';

  const paymentstatus=[{code:'UNCONFIRMED',des:formatMessage({ id: 'payment.unconfirmed'})},
{code:'CONFIRMED',des:formatMessage({ id: 'payment.confirmed'})},
];

export default paymentstatus;