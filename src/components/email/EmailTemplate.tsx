import { IEmail } from '@/utils/custom-types';

export function EmailTemplate({ name, description }: IEmail) {
    return (
        <section>
            <h1>Chào mừng, {name}!</h1>
            <p>Nội dung bạn gửi: {description}</p>
            <p>Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên lạc lại với bạn trong thời gian ngắn nhất.</p>
            <p>Cám ơn bạn đã liên hệ</p>
        </section>
    );
}