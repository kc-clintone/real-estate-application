import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

export const Banner = ({
	purpose,
	title1,
	title2,
	desc1,
	desc2,
	buttonText,
	linkName,
	imageUrl,
}) => (
	<Flex 
  flexWrap='wrap' 
  justifyContent='start'
   alignItems='center' 
   marginBottom='10' 
   marginTop='10' 
   backgroundImage={imageUrl} 
   height='auto'>
		<Box p='5'  marginTop='5' marginBottom='5'>
			<Text color='gray.500' fontSize='sm' fontWeight='medium'>
				{purpose}
			</Text>
			<Text fontSize='3xl' fontWeight='bold'>
				{title1}
				<br />
				{title2}
			</Text>
			<Text fontSize='lg' paddingTop='3.1' paddingBottom='3.1' color='gray.900'>
				{desc1}
				<br />
				{desc2}
			</Text>
			<Button fontSize='xl' bg='blue.300' color='white'>
				<Link href={linkName}>
					<a>{buttonText}</a>
				</Link>
			</Button>
		</Box>
	</Flex>
);

const Home = ({ propertiesForSale, propertiesForRent }) => (
	<Box marginBottom='10'>
		<Banner
			purpose='RENT A HOME'
			title1='Rental Homes for'
			title2='Everyone'
			desc1=' Explore from Apartments, Builder Floors, Villas'
			desc2='and more'
			buttonText='Explore Renting'

			linkName='/search?purpose=for-rent'
			imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
		/>
		<Flex flexWrap='wrap' justifyContent='space-evenly' gap='5'>
			{propertiesForRent.map((property) => (
				<Property property={property} key={property.id} />
			))}
		</Flex>
		<Banner
			purpose='BUY A HOME'
			title1=' Find, Buy & Own Your'
			title2='Dream Home'
			desc1=' Explore from Apartments, Land, Builder Floors,'
			desc2=' villas and more'
			buttonText='Explore Buying'
			linkName='/search?purpose=for-sale'
			imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
		/>
		<Flex flexWrap='wrap' justifyContent='space-evenly' gap='5'>
			{propertiesForSale.map((property) => (
				<Property property={property} key={property.id} />
			))}
		</Flex>
	</Box>
);

export async function getStaticProps() {
	const propertyForSale = await fetchApi(
		`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
	);
	const propertyForRent = await fetchApi(
		`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
	);

	return {
		props: {
			propertiesForSale: propertyForSale?.hits,
			propertiesForRent: propertyForRent?.hits,
		},
	};
}

export default Home;
