import { ElNotification } from 'element-plus'

var Message = Message || {};

Message.open = () => {
  ElNotification({
    title: 'success',
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}

export default Message