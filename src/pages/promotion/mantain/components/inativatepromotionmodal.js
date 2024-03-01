import { Button, Form, Modal, Alert, Typography } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
const { Text } = Typography;
const InativatePromotion = ({ handleCancelvisibleDeleteProduct,

  loadingPromotionInativatio,
  confirmvisibleDeleteProduct,
  visible }) => {
  const [form2] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 }

  }
  return <Modal
    open={visible}
    title={<Alert message={formatMessage({ id: 'inactivate.promotion.question' })} description={formatMessage({ id: 'delete.product.warning' })} type="error" showIcon />}
    footer={[
      <Button key="back" onClick={handleCancelvisibleDeleteProduct}>
        {formatMessage({ id: 'global.cancel' })}
      </Button>,
      <Button key="submit" type="danger" loading={loadingPromotionInativatio} onClick={confirmvisibleDeleteProduct}>
        {formatMessage({ id: 'product.remove' })}
      </Button>,
    ]}
    closable={false}
    onCancel={handleCancelvisibleDeleteProduct}
  >
    <Form {...layout} form={form2}>
      <Text type="secondary" > {formatMessage({ id: 'confirm.product.delection' })}</Text>
    </Form>
  </Modal>

}


export default InativatePromotion;