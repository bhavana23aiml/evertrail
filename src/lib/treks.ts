export type Trek = {
  slug: string; name: string; state: string; difficulty: 'Easy' | 'Moderate' | 'Challenging';
  days: number; altitude: number; distance: number; price: number; image: string; tag: string;
  season: string; description: string;
};
export const photos = {
  hero: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85',
  snow: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1000&q=85',
  valley: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=85',
  lake: 'https://images.unsplash.com/photo-1439853949212-09789ea49f0f?auto=format&fit=crop&w=1000&q=85',
  hills: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85',
  camp: 'https://images.unsplash.com/photo-1478131143081-fd1d858f26b4?auto=format&fit=crop&w=1000&q=85',
};
// Illustrative editorial catalog only. Never use these estimates as booking inventory.
export const treks: Trek[] = [
  { slug: 'kedarkantha', name: 'Kedarkantha', state: 'Uttarakhand', difficulty: 'Moderate', days: 6, altitude: 3810, distance: 20, price: 7499, image: photos.snow, tag: 'THE WINTER CLASSIC', season: 'December – April', description: 'Follow pine-scented forest trails to quiet campsites and a sweeping Himalayan summit. A snow-filled introduction to the mountains, with a steady ascent that rewards thoughtful preparation.' },
  { slug: 'hampta-pass', name: 'Hampta Pass', state: 'Himachal Pradesh', difficulty: 'Moderate', days: 5, altitude: 4270, distance: 26, price: 8999, image: photos.valley, tag: 'TWO WORLDS. ONE TRAIL.', season: 'June – September', description: 'Walk from the green valleys of Kullu into the stark, beautiful landscape of Lahaul. River crossings, wildflower meadows and an unforgettable high pass make every day feel different.' },
  { slug: 'kashmir-great-lakes', name: 'Kashmir Great Lakes', state: 'Kashmir', difficulty: 'Challenging', days: 7, altitude: 4200, distance: 72, price: 15999, image: photos.lake, tag: 'BEYOND THE ORDINARY', season: 'July – September', description: 'A long-distance journey through alpine meadows and high mountain lakes. Expect consecutive days on your feet, remote terrain and the kind of silence you come to the mountains to find.' },
  { slug: 'valley-of-flowers', name: 'Valley of Flowers', state: 'Uttarakhand', difficulty: 'Moderate', days: 6, altitude: 3658, distance: 38, price: 9499, image: photos.valley, tag: 'NATURE IN FULL BLOOM', season: 'July – September', description: 'Explore a protected Himalayan valley during its brief flowering season. Lush forest approaches and botanical richness make this a journey for curious, unhurried explorers.' },
  ...([
    ['brahmatal', 'Brahmatal', 'Uttarakhand', 'Moderate', 6, 3734, 24, 7999, 'snow', 'December – March'],
    ['tarsar-marsar', 'Tarsar Marsar', 'Kashmir', 'Moderate', 7, 4024, 48, 13999, 'lake', 'July – September'],
    ['har-ki-dun', 'Har Ki Dun', 'Uttarakhand', 'Moderate', 7, 3566, 47, 10999, 'valley', 'April – June'],
    ['kuari-pass', 'Kuari Pass', 'Uttarakhand', 'Moderate', 6, 3814, 33, 8499, 'snow', 'March – May'],
    ['dayara-bugyal', 'Dayara Bugyal', 'Uttarakhand', 'Easy', 4, 3639, 22, 6499, 'hills', 'April – June'],
    ['sandakphu', 'Sandakphu', 'West Bengal', 'Moderate', 6, 3636, 46, 11999, 'hero', 'October – December'],
    ['nandi-hills', 'Nandi Hills', 'Karnataka', 'Easy', 1, 1478, 5, 1299, 'hills', 'October – March'],
    ['skandagiri', 'Skandagiri', 'Karnataka', 'Moderate', 1, 1450, 8, 1499, 'hills', 'October – March'],
    ['kumara-parvatha', 'Kumara Parvatha', 'Karnataka', 'Challenging', 2, 1712, 22, 3499, 'hills', 'October – February'],
    ['kodachadri', 'Kodachadri', 'Karnataka', 'Moderate', 2, 1343, 14, 3299, 'valley', 'October – February'],
    ['tadiandamol', 'Tadiandamol', 'Karnataka', 'Easy', 2, 1748, 14, 2999, 'hills', 'October – February'],
  ] as const).map(([slug, name, state, difficulty, days, altitude, distance, price, photo, season]) => ({ slug, name, state, difficulty, days, altitude, distance, price, image: photos[photo], season, tag: 'TAKE THE SCENIC ROUTE', description: `Discover ${name} on a thoughtfully paced journey through ${state}. Take time for changing landscapes, quiet trails and a fresh perspective. This sample route needs operator verification before departure details can be published.` })),
];
export const destinations = ['Himachal Pradesh', 'Uttarakhand', 'Kashmir', 'Ladakh', 'Karnataka', 'Maharashtra', 'Sikkim', 'Kerala'];
export const currency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;
