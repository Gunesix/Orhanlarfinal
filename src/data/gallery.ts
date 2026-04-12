import img1 from '../assets/gallery/1.jpeg';
import vid1 from '../assets/gallery/1.mp4';
import img2 from '../assets/gallery/2.jpeg';
import img3 from '../assets/gallery/3.jpeg';
import img4 from '../assets/gallery/4.jpeg';
import img5 from '../assets/gallery/5.jpeg';
import img6 from '../assets/gallery/6.jpeg';
import img7 from '../assets/gallery/7.jpeg';
import img8 from '../assets/gallery/8.jpeg';
import img9 from '../assets/gallery/9.jpeg';
import img10 from '../assets/gallery/10.jpeg';
import vid11 from '../assets/gallery/11.mp4';
import img12 from '../assets/gallery/12.jpeg';
import img13 from '../assets/gallery/13.jpeg';
import img14 from '../assets/gallery/14.jpeg';
import img15 from '../assets/gallery/15.jpeg';
import vid16 from '../assets/gallery/16.mp4';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  type?: 'image' | 'video';
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    url: img1,
    title: 'Hafriyat Çalışması',
    category: 'Hafriyat',
    type: 'image'
  },
  {
    id: '1-vid',
    url: vid1,
    title: 'Hafriyat Video',
    category: 'Hafriyat',
    type: 'video'
  },
  {
    id: '2',
    url: img2,
    title: 'Kazı İşleri',
    category: 'Kazı',
    type: 'image'
  },
  {
    id: '3',
    url: img3,
    title: 'Temel Kazma',
    category: 'Temel',
    type: 'image'
  },
  {
    id: '4',
    url: img4,
    title: 'Altyapı Çalışması',
    category: 'Altyapı',
    type: 'image'
  },
  {
    id: '5',
    url: img5,
    title: 'Yıkım İşleri',
    category: 'Yıkım',
    type: 'image'
  },
  {
    id: '6',
    url: img6,
    title: 'Gece Çalışması',
    category: 'Hafriyat',
    type: 'image'
  },
  {
    id: '7',
    url: img7,
    title: 'Makine Parkuru',
    category: 'Ekipman',
    type: 'image'
  },
  {
    id: '8',
    url: img8,
    title: 'Kanal Kazısı',
    category: 'Kazı',
    type: 'image'
  },
  {
    id: '9',
    url: img9,
    title: 'Hafriyat Çalışması',
    category: 'Hafriyat',
    type: 'image'
  },
  {
    id: '10',
    url: img10,
    title: 'Hafriyat Çalışması',
    category: 'Hafriyat',
    type: 'image'
  },
  {
    id: '11-vid',
    url: vid11,
    title: 'Çalışma Videosu',
    category: 'Hafriyat',
    type: 'video'
  },
  {
    id: '12',
    url: img12,
    title: 'Hafriyat Çalışması',
    category: 'Hafriyat',
    type: 'image'
  },
  {
    id: '13',
    url: img13,
    title: 'Hafriyat Çalışması',
    category: 'Hafriyat',
    type: 'image'
  },
  {
    id: '14',
    url: img14,
    title: 'Hafriyat Çalışması',
    category: 'Hafriyat',
    type: 'image'
  },
  {
    id: '15',
    url: img15,
    title: 'Hafriyat Çalışması',
    category: 'Hafriyat',
    type: 'image'
  },
  {
    id: '16-vid',
    url: vid16,
    title: 'Çalışma Videosu',
    category: 'Hafriyat',
    type: 'video'
  }
];
