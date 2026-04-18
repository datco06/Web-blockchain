import { ChangeEvent, useRef } from 'react';
import { useModel } from 'umi';
import './contact.less';

const Contact = () => {
	const { contact, updateContact } = useModel('freelancer.profile.index');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const triggerFilePicker = () => {
		fileInputRef.current?.click();
	};

	const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			updateContact('avatarUrl', reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	return (
		<form className='contact' onSubmit={(e) => e.preventDefault()}>
			<div className='avatar-update'>
				<img src={contact.avatarUrl} alt='Profile avatar preview' />
				<button type='button' className='avatar-btn' onClick={triggerFilePicker}>
					<span role='img' aria-label='camera'>📷</span>
				</button>
				<input
					type='file'
					accept='image/*'
					ref={fileInputRef}
					onChange={handleAvatarChange}
					hidden
				/>
			</div>
			<div className='fields'>
				<label>
					<span>Display Name</span>
					<input
						type='text'
						value={contact.displayName}
						onChange={(e) => updateContact('displayName', e.target.value)}
					/>
				</label>
				<label>
					<span>Professional Title</span>
					<input
						type='text'
						value={contact.title}
						onChange={(e) => updateContact('title', e.target.value)}
					/>
				</label>
				<label className='textarea'>
					<span>Short Bio</span>
					<textarea
						rows={4}
						value={contact.bio}
						onChange={(e) => updateContact('bio', e.target.value)}
					/>
				</label>
			</div>
		</form>
	);
};

export default Contact;
