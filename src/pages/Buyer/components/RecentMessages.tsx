interface Message {
	name: string;
	time: string;
	snippet: string;
	avatar: string;
}

const RecentMessages = ({ messages }: { messages: Message[] }) => (
	<section className='recent-messages'>
		<header>
			<div>
				<h2>Recent Messages</h2>
				<span>3 new</span>
			</div>
			<button type='button'>Go to Messages</button>
		</header>
		<ul>
			{messages.map((message) => (
				<li key={message.name}>
					<div className='avatar'>
						<span>{message.avatar}</span>
					</div>
					<div className='message-body'>
						<div className='message-header'>
							<strong>{message.name}</strong>
							<span>{message.time}</span>
						</div>
						<p>{message.snippet}</p>
					</div>
				</li>
			))}
		</ul>
	</section>
);

export type { Message };
export default RecentMessages;
