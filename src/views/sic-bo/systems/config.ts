import img1 from '~/sic-bo/1.png'
import img2 from '~/sic-bo/2.png'
import img3 from '~/sic-bo/3.png'
import img4 from '~/sic-bo/4.png'
import img5 from '~/sic-bo/5.png'
import img6 from '~/sic-bo/6.png'



const manifest = {
    bundles: [
        {
            name: 'screen',
            assets: [
                {
                    name: 'img1',
                    srcs: img1,
                },
                {
                    name: 'img2',
                    srcs: img2,
                },
                {
                    name: 'img3',
                    srcs: img3,
                },
                {
                    name: 'img4',
                    srcs: img4,
                },
                {
                    name: 'img5',
                    srcs: img5,
                },
                {
                    name: 'img6',
                    srcs: img6,
                },
            ],
        }
    ]
};

export { manifest };