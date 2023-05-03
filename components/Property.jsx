import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/house.jpg';

const Property = ({
	property: {
		coverPhoto,
		price,
		rentFrequency,
		rooms,
		title,
		baths,
		area,
		agency,
		isVerified,
		externalID,
	},
}) => (
	<Link href={`/property/${externalID}`} passHref>
		<Flex
			flexWrap='wrap'
			w='390px'
			paddingTop='0px'
			justifyContent='flex-start'
			cursor='pointer'
			boxShadow='2xl'
			alignItems='center'
		>
			<Box w='full'>
				<Image
					src={coverPhoto ? coverPhoto.url : DefaultImage}
					width={390}
					height={260}
				/>
			</Box>
			<Box w='full' p='5'>
				<Flex
					paddingTop='2'
					paddingBottom='2'
					alignItems='center'
					justifyContent='space-between'
				>
					<Box>
						<Avatar size='sm' src={agency?.logo?.url}></Avatar>
					</Box>
					<Flex alignItems='center'>
						<Box paddingRight='3' color='green.400'>
							{isVerified && <GoVerified />}
						</Box>
						<Text fontWeight='bold' fontSize='lg'>
							KES {price}
							{rentFrequency && `/${rentFrequency}`}
						</Text>
					</Flex>
				</Flex>
				<Text fontSize='lg'>
					{title.length > 30 ? title.substring(0, 30) + '...' : title}
				</Text>
				<Flex
					alignItems='center'
					p='1'
					justifyContent='space-between'
					w='250px'
					color='blue.400'
				>
					{rooms}
					<FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
				</Flex>
			</Box>
		</Flex>
	</Link>
);

export default Property;
