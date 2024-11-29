import Image from 'next/image'

import mashiroSiina from '@/public/sakurasou-mashiro-shiina.jpg'

const DashboardPage = () => {
	return (
		<div>
			<p>HOME PAGE ABOBA</p>
			<Image
				src={mashiroSiina}
				width={500}
				height={500}
				alt='Picture of the author'
			/>
		</div>
	)
}

export default DashboardPage
