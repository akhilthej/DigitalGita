import { Dimensions, View, Image } from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { styled } from 'nativewind';

const ImageSlider = () => {
    const [pagingEnabled, setPagingEnabled] = useState(true);
    const width = Dimensions.get('window').width;

    const list = [
        {
            id: 1,
            title: 'First Item',
            image: require('../assets/images/imageslider/csdcover.png')
        },
        {
            id: 2,
            title: 'Second Item',
            image: require('../assets/images/imageslider/csdcover.png')
        },
        {
            id: 3,
            title: 'Third Item',
            image: require('../assets/images/imageslider/csdcover.png')
        },
        {
            id: 4,
            title: 'Fourth Item',
            image: require('../assets/images/imageslider/csdcover.png')
        },
        {
            id: 5,
            title: 'Fifth Item',
            image: require('../assets/images/imageslider/csdcover.png')
        }
    ];

    const StyledView = styled(View);
    const StyledImage = styled(Image);

    return (
        <StyledView className="flex-1 mb-4">
            <Carousel
                width={width}
                height={width / 3}
                data={list}
                autoPlay={true}
                pagingEnabled={pagingEnabled}
                scrollAnimationDuration={3000}
                renderItem={({ item }) => (
                    <StyledView className="flex-1 justify-center overflow-hidden m-2">
                        <StyledImage className="w-full h-full" source={item.image} style={{ resizeMode: 'cover' }} />
                    </StyledView>
                )}
            />
        </StyledView>
    );
};

export default ImageSlider;
