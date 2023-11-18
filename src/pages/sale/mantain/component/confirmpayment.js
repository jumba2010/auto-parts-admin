import { Button,Form,Modal,Alert,Select,Input} from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
const { TextArea } = Input;
const ConfirmPaymentModal = ({confirmPayment,
    onClickBack,form,
    paymentMethod,
    visible}) => {
    const formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 },
      };

return <Modal width={800}
open={visible}
title={  <Alert message={formatMessage({ id: 'payment.confirmation'})} description={formatMessage({ id: 'payment.confirm'})} type="info" showIcon />}
footer={[
  <Button key="back" onClick={onClickBack}>
    {formatMessage({ id: 'global.cancel'})}
  </Button>,
  <Button key="submit" type="primary"  onClick={confirmPayment}>
   {formatMessage({ id: 'payment.paynow'})}
  </Button>,
]}
closable={false}
onCancel={onClickBack}
>
<Form {...formItemLayout} form={form}> 
<Form.Item label= {formatMessage({ id: 'payment.method'})} name='paymentMethod'
rules={[{ required: true, message: formatMessage({ id: 'payment.method.required'})}]}

>

<Select
disabled
defaultValue={paymentMethod}
optionFilterProp="children"
  
  filterOption={(input, option) =>
     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
   }
 >
</Select>       
</Form.Item>
      <Form.Item name='remarks' 
      label={
  <span>
   {formatMessage({ id: 'sale.remarks'})}
  </span>
}>
  <TextArea autoComplete="off"  rows='4'  />
        </Form.Item> 
</Form>
</Modal>

}


export default ConfirmPaymentModal;