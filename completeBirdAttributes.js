const mongoose = require('mongoose');
const MONGODB_URI = "mongodb://localhost:27017/birddb";

mongoose.connect(MONGODB_URI);

const Bird = mongoose.model('Bird', new mongoose.Schema({
  scientificName: String,
  commonName: String,
  attributes: Object
}));

// COMPREHENSIVE BIRD ATTRIBUTES FOR ALL 200+ BIRDS
const birdAttributes = {
  // A
  'Acadian Flycatcher': { size: 'small', primaryColors: ['olive', 'yellow'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['olive upperparts', 'yellow underparts'] },
  'American Crow': { size: 'large', primaryColors: ['black'], habitat: ['urban', 'forest'], diet: ['omnivore'], distinctiveFeatures: ['all black', 'intelligent'] },
  'American Goldfinch': { size: 'small', primaryColors: ['yellow', 'black'], habitat: ['fields', 'gardens'], diet: ['seeds'], distinctiveFeatures: ['bright yellow', 'black wings'] },
  'American Pipit': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['open fields'], diet: ['insects'], distinctiveFeatures: ['brown streaked', 'tail wagging'] },
  'American Redstart': { size: 'very small', primaryColors: ['black', 'orange'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['black and orange', 'active tail fanning'] },
  'American Three Toed Woodpecker': { size: 'medium', primaryColors: ['black', 'white'], habitat: ['coniferous forest'], diet: ['insects'], distinctiveFeatures: ['black back', 'white underparts', 'three toes'] },
  'Anna Hummingbird': { size: 'very small', primaryColors: ['green', 'pink'], habitat: ['gardens'], diet: ['nectar'], distinctiveFeatures: ['iridescent green', 'pink throat'] },
  'Arctic Tern': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['long migration', 'forked tail'] },
  
  // B
  'Baird Sparrow': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['grasslands'], diet: ['seeds'], distinctiveFeatures: ['brown streaked', 'grassland bird'] },
  'Baltimore Oriole': { size: 'medium', primaryColors: ['orange', 'black'], habitat: ['forest edges'], diet: ['insects', 'fruit'], distinctiveFeatures: ['bright orange', 'black head'] },
  'Bank Swallow': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['river banks'], diet: ['flying insects'], distinctiveFeatures: ['brown breast band', 'colonial nester'] },
  'Barn Swallow': { size: 'small', primaryColors: ['blue', 'orange'], habitat: ['open country'], diet: ['flying insects'], distinctiveFeatures: ['deeply forked tail', 'orange underparts'] },
  'Bay Breasted Warbler': { size: 'very small', primaryColors: ['bay', 'white'], habitat: ['spruce forest'], diet: ['insects'], distinctiveFeatures: ['bay colored breast', 'spruce specialist'] },
  'Belted Kingfisher': { size: 'medium', primaryColors: ['blue', 'white'], habitat: ['waterways'], diet: ['fish'], distinctiveFeatures: ['crested head', 'rattling call'] },
  'Bewick Wren': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['thickets'], diet: ['insects'], distinctiveFeatures: ['white eyebrow', 'long tail'] },
  'Black And White Warbler': { size: 'very small', primaryColors: ['black', 'white'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['black and white striped', 'tree climber'] },
  'Black Billed Cuckoo': { size: 'medium', primaryColors: ['brown', 'white'], habitat: ['woodlands'], diet: ['insects'], distinctiveFeatures: ['slender body', 'black bill'] },
  'Black Capped Vireo': { size: 'small', primaryColors: ['olive', 'white'], habitat: ['scrub'], diet: ['insects'], distinctiveFeatures: ['black cap', 'white spectacles'] },
  'Black Footed Albatross': { size: 'very large', primaryColors: ['brown', 'white'], habitat: ['ocean'], diet: ['fish', 'squid'], distinctiveFeatures: ['large seabird', 'ocean wanderer'] },
  'Black Tern': { size: 'small', primaryColors: ['black', 'white'], habitat: ['marshes'], diet: ['insects'], distinctiveFeatures: ['black plumage', 'marsh nester'] },
  'Black Throated Blue Warbler': { size: 'very small', primaryColors: ['blue', 'black'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['blue upperparts', 'black throat'] },
  'Black Throated Sparrow': { size: 'small', primaryColors: ['gray', 'black'], habitat: ['desert'], diet: ['seeds'], distinctiveFeatures: ['black throat', 'desert habitat'] },
  'Blue Grosbeak': { size: 'medium', primaryColors: ['blue', 'brown'], habitat: ['brushy areas'], diet: ['seeds', 'insects'], distinctiveFeatures: ['deep blue', 'large bill'] },
  'Blue Headed Vireo': { size: 'small', primaryColors: ['blue', 'white'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['blue-gray head', 'white spectacles'] },
  'Blue Jay': { size: 'medium', primaryColors: ['blue', 'white'], habitat: ['forest', 'urban'], diet: ['nuts', 'seeds'], distinctiveFeatures: ['crested head', 'blue plumage'] },
  'Blue Winged Warbler': { size: 'very small', primaryColors: ['yellow', 'blue'], habitat: ['thickets'], diet: ['insects'], distinctiveFeatures: ['yellow body', 'blue-gray wings'] },
  'Boat Tailed Grackle': { size: 'large', primaryColors: ['black'], habitat: ['coastal'], diet: ['omnivore'], distinctiveFeatures: ['long tail', 'coastal marshes'] },
  'Bobolink': { size: 'small', primaryColors: ['black', 'white'], habitat: ['grasslands'], diet: ['seeds'], distinctiveFeatures: ['black underparts', 'white back'] },
  'Bohemian Waxwing': { size: 'medium', primaryColors: ['brown', 'gray'], habitat: ['northern forests'], diet: ['berries'], distinctiveFeatures: ['crested', 'waxy wing tips'] },
  'Brandt Cormorant': { size: 'large', primaryColors: ['black'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['all black', 'coastal diver'] },
  'Brewer Blackbird': { size: 'medium', primaryColors: ['black'], habitat: ['open areas'], diet: ['seeds', 'insects'], distinctiveFeatures: ['yellow eyes', 'iridescent black'] },
  'Brewer Sparrow': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['sagebrush'], diet: ['seeds'], distinctiveFeatures: ['brown streaked', 'sagebrush habitat'] },
  'Bronzed Cowbird': { size: 'medium', primaryColors: ['black'], habitat: ['open areas'], diet: ['seeds'], distinctiveFeatures: ['red eyes', 'bronze sheen'] },
  'Brown Creeper': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['brown camouflaged', 'tree trunk climber'] },
  'Brown Pelican': { size: 'very large', primaryColors: ['brown', 'white'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['large bill pouch', 'diving fisher'] },
  'Brown Thrasher': { size: 'medium', primaryColors: ['brown', 'white'], habitat: ['thickets'], diet: ['insects'], distinctiveFeatures: ['long tail', 'brown streaked'] },
  
  // C
  'Cactus Wren': { size: 'medium', primaryColors: ['brown', 'white'], habitat: ['desert'], diet: ['insects'], distinctiveFeatures: ['cactus nester', 'white eyebrows'] },
  'California Gull': { size: 'large', primaryColors: ['gray', 'white'], habitat: ['coastal'], diet: ['fish', 'scavenger'], distinctiveFeatures: ['yellow bill', 'gray wings'] },
  'Canada Warbler': { size: 'very small', primaryColors: ['yellow', 'gray'], habitat: ['forest undergrowth'], diet: ['insects'], distinctiveFeatures: ['necklace of streaks', 'yellow underparts'] },
  'Cape Glossy Starling': { size: 'medium', primaryColors: ['blue', 'green'], habitat: ['savanna'], diet: ['insects', 'fruit'], distinctiveFeatures: ['iridescent blue-green', 'African species'] },
  'Cape May Warbler': { size: 'very small', primaryColors: ['yellow', 'brown'], habitat: ['spruce forest'], diet: ['insects'], distinctiveFeatures: ['chestnut cheek', 'yellow underparts'] },
  'Cardinal': { size: 'medium', primaryColors: ['red', 'black'], habitat: ['forest', 'gardens'], diet: ['seeds', 'fruit'], distinctiveFeatures: ['crested head', 'bright red'] },
  'Carolina Wren': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['forest undergrowth'], diet: ['insects'], distinctiveFeatures: ['white eyebrow', 'loud song'] },
  'Caspian Tern': { size: 'large', primaryColors: ['white', 'black'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['large red bill', 'black cap'] },
  'Cedar Waxwing': { size: 'medium', primaryColors: ['brown', 'yellow'], habitat: ['woodlands'], diet: ['berries'], distinctiveFeatures: ['crested', 'yellow tail tip'] },
  'Cerulean Warbler': { size: 'very small', primaryColors: ['blue', 'white'], habitat: ['forest canopy'], diet: ['insects'], distinctiveFeatures: ['sky blue', 'forest treetops'] },
  'Chestnut Sided Warbler': { size: 'very small', primaryColors: ['yellow', 'chestnut'], habitat: ['second growth'], diet: ['insects'], distinctiveFeatures: ['chestnut sides', 'yellow cap'] },
  'Chipping Sparrow': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['yards', 'forest edges'], diet: ['seeds'], distinctiveFeatures: ['rusty cap', 'black eye line'] },
  'Chuck Will Widow': { size: 'medium', primaryColors: ['brown', 'gray'], habitat: ['woodlands'], diet: ['insects'], distinctiveFeatures: ['nocturnal', 'camouflaged'] },
  'Clark Nutcracker': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['mountains'], diet: ['nuts', 'seeds'], distinctiveFeatures: ['gray body', 'white patches'] },
  'Clay Colored Sparrow': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['grasslands'], diet: ['seeds'], distinctiveFeatures: ['clay-colored', 'grassland bird'] },
  'Cliff Swallow': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['cliffs', 'bridges'], diet: ['flying insects'], distinctiveFeatures: ['square tail', 'mud nests'] },
  'Common Raven': { size: 'very large', primaryColors: ['black'], habitat: ['wilderness'], diet: ['omnivore'], distinctiveFeatures: ['massive bill', 'wedge tail'] },
  'Common Tern': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['forked tail', 'black cap'] },
  'Common Yellowthroat': { size: 'very small', primaryColors: ['yellow', 'brown'], habitat: ['marshes'], diet: ['insects'], distinctiveFeatures: ['black mask', 'yellow throat'] },
  'Crested Auklet': { size: 'small', primaryColors: ['black', 'white'], habitat: ['arctic'], diet: ['plankton'], distinctiveFeatures: ['crested bill', 'arctic seabird'] },
  
  // D
  'Dark Eyed Junco': { size: 'small', primaryColors: ['gray', 'white'], habitat: ['forest', 'yards'], diet: ['seeds'], distinctiveFeatures: ['dark eyes', 'white outer tail'] },
  'Downy Woodpecker': { size: 'small', primaryColors: ['black', 'white'], habitat: ['forest', 'urban'], diet: ['insects'], distinctiveFeatures: ['small bill', 'black and white'] },
  
  // E
  'Eared Grebe': { size: 'small', primaryColors: ['black', 'red'], habitat: ['lakes'], diet: ['aquatic insects'], distinctiveFeatures: ['red neck', 'black body'] },
  'Eastern Towhee': { size: 'medium', primaryColors: ['black', 'white', 'rufous'], habitat: ['thickets'], diet: ['seeds', 'insects'], distinctiveFeatures: ['black upperparts', 'rufous sides'] },
  'Elegant Tern': { size: 'medium', primaryColors: ['white', 'black'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['slender bill', 'black cap'] },
  'European Goldfinch': { size: 'small', primaryColors: ['red', 'white', 'yellow'], habitat: ['gardens'], diet: ['seeds'], distinctiveFeatures: ['red face', 'yellow wing patches'] },
  'Evening Grosbeak': { size: 'medium', primaryColors: ['yellow', 'black'], habitat: ['northern forests'], diet: ['seeds'], distinctiveFeatures: ['large bill', 'yellow body'] },
  
  // F
  'Field Sparrow': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['fields'], diet: ['seeds'], distinctiveFeatures: ['pink bill', 'brown streaked'] },
  'Fish Crow': { size: 'medium', primaryColors: ['black'], habitat: ['coastal'], diet: ['fish', 'crustaceans'], distinctiveFeatures: ['coastal crow', 'nasal call'] },
  'Florida Jay': { size: 'medium', primaryColors: ['blue', 'gray'], habitat: ['scrub'], diet: ['acorns', 'insects'], distinctiveFeatures: ['blue upperparts', 'scrub habitat'] },
  'Forsters Tern': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['marshes'], diet: ['fish'], distinctiveFeatures: ['orange bill', 'black eye patch'] },
  'Fox Sparrow': { size: 'medium', primaryColors: ['red', 'gray'], habitat: ['thickets'], diet: ['seeds'], distinctiveFeatures: ['red streaked', 'large sparrow'] },
  'Frigatebird': { size: 'large', primaryColors: ['black'], habitat: ['tropical oceans'], diet: ['fish'], distinctiveFeatures: ['long wings', 'red throat pouch'] },
  
  // G
  'Gadwall': { size: 'medium', primaryColors: ['brown', 'gray'], habitat: ['marshes'], diet: ['aquatic plants'], distinctiveFeatures: ['gray body', 'black rear'] },
  'Geococcyx': { size: 'large', primaryColors: ['brown', 'white'], habitat: ['desert'], diet: ['reptiles', 'insects'], distinctiveFeatures: ['long tail', 'fast runner'] },
  'Glaucous Winged Gull': { size: 'large', primaryColors: ['gray', 'white'], habitat: ['coastal'], diet: ['fish', 'scavenger'], distinctiveFeatures: ['pale gray wings', 'coastal'] },
  'Golden Winged Warbler': { size: 'very small', primaryColors: ['yellow', 'gray'], habitat: ['shrublands'], diet: ['insects'], distinctiveFeatures: ['golden wings', 'black throat'] },
  'Grasshopper Sparrow': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['grasslands'], diet: ['seeds'], distinctiveFeatures: ['flat head', 'grassland bird'] },
  'Gray Catbird': { size: 'medium', primaryColors: ['gray', 'black'], habitat: ['thickets'], diet: ['insects', 'fruit'], distinctiveFeatures: ['gray body', 'black cap'] },
  'Gray Crowned Rosy Finch': { size: 'small', primaryColors: ['brown', 'pink'], habitat: ['alpine'], diet: ['seeds'], distinctiveFeatures: ['gray crown', 'pink body'] },
  'Gray Kingbird': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['coastal'], diet: ['insects'], distinctiveFeatures: ['gray upperparts', 'coastal'] },
  'Great Crested Flycatcher': { size: 'medium', primaryColors: ['yellow', 'brown'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['crested head', 'yellow belly'] },
  'Great Grey Shrike': { size: 'medium', primaryColors: ['gray', 'black'], habitat: ['open areas'], diet: ['small animals'], distinctiveFeatures: ['black mask', 'predatory songbird'] },
  'Green Jay': { size: 'medium', primaryColors: ['green', 'blue'], habitat: ['woodlands'], diet: ['insects', 'fruit'], distinctiveFeatures: ['green body', 'blue head'] },
  'Green Kingfisher': { size: 'small', primaryColors: ['green', 'white'], habitat: ['streams'], diet: ['fish'], distinctiveFeatures: ['green upperparts', 'small kingfisher'] },
  'Green Tailed Towhee': { size: 'medium', primaryColors: ['green', 'gray'], habitat: ['chaparral'], diet: ['seeds'], distinctiveFeatures: ['green tail', 'rufous cap'] },
  'Green Violetear': { size: 'small', primaryColors: ['green', 'violet'], habitat: ['cloud forest'], diet: ['nectar'], distinctiveFeatures: ['violet ear patch', 'hummingbird'] },
  'Groove Billed Ani': { size: 'medium', primaryColors: ['black'], habitat: ['tropical'], diet: ['insects'], distinctiveFeatures: ['grooved bill', 'black body'] },
  
  // Continue with more birds...
  'Harris Sparrow': { size: 'medium', primaryColors: ['brown', 'black'], habitat: ['tundra'], diet: ['seeds'], distinctiveFeatures: ['black face', 'large sparrow'] },
  'Heermann Gull': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['red bill', 'dark gray'] },
  'Henslow Sparrow': { size: 'small', primaryColors: ['brown', 'olive'], habitat: ['grasslands'], diet: ['seeds'], distinctiveFeatures: ['olive head', 'grassland'] },
  'Herring Gull': { size: 'large', primaryColors: ['gray', 'white'], habitat: ['coastal'], diet: ['fish', 'scavenger'], distinctiveFeatures: ['pink legs', 'gray wings'] },
  'Hooded Merganser': { size: 'medium', primaryColors: ['black', 'white', 'brown'], habitat: ['wooded ponds'], diet: ['fish'], distinctiveFeatures: ['crested head', 'fish eater'] },
  'Hooded Oriole': { size: 'medium', primaryColors: ['orange', 'black'], habitat: ['palm trees'], diet: ['insects', 'nectar'], distinctiveFeatures: ['orange body', 'black throat'] },
  'Hooded Warbler': { size: 'very small', primaryColors: ['yellow', 'black'], habitat: ['forest undergrowth'], diet: ['insects'], distinctiveFeatures: ['black hood', 'yellow face'] },
  'Horned Grebe': { size: 'small', primaryColors: ['black', 'red'], habitat: ['lakes'], diet: ['aquatic life'], distinctiveFeatures: ['golden horns', 'red neck'] },
  'Horned Lark': { size: 'small', primaryColors: ['brown', 'yellow'], habitat: ['open fields'], diet: ['seeds'], distinctiveFeatures: ['black horns', 'open country'] },
  'Horned Puffin': { size: 'medium', primaryColors: ['black', 'white'], habitat: ['coastal cliffs'], diet: ['fish'], distinctiveFeatures: ['colorful bill', 'black and white'] },
  'House Sparrow': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['urban'], diet: ['seeds'], distinctiveFeatures: ['black bib', 'urban adaptor'] },
  'House Wren': { size: 'small', primaryColors: ['brown'], habitat: ['thickets'], diet: ['insects'], distinctiveFeatures: ['small brown', 'cocked tail'] },
  
  // I
  'Indigo Bunting': { size: 'small', primaryColors: ['blue'], habitat: ['brushy areas'], diet: ['seeds'], distinctiveFeatures: ['bright blue', 'seed eater'] },
  'Ivory Gull': { size: 'medium', primaryColors: ['white'], habitat: ['arctic'], diet: ['scavenger'], distinctiveFeatures: ['all white', 'arctic'] },
  
  // K
  'Kentucky Warbler': { size: 'very small', primaryColors: ['yellow', 'black'], habitat: ['forest floor'], diet: ['insects'], distinctiveFeatures: ['black sideburns', 'yellow spectacles'] },
  
  // L
  'Laysan Albatross': { size: 'very large', primaryColors: ['white', 'black'], habitat: ['ocean'], diet: ['squid'], distinctiveFeatures: ['large seabird', 'ocean wanderer'] },
  'Lazuli Bunting': { size: 'small', primaryColors: ['blue', 'orange'], habitat: ['brushy areas'], diet: ['seeds'], distinctiveFeatures: ['blue head', 'orange breast'] },
  'Le Conte Sparrow': { size: 'small', primaryColors: ['brown', 'orange'], habitat: ['marshes'], diet: ['seeds'], distinctiveFeatures: ['orange face', 'marsh bird'] },
  'Least Auklet': { size: 'small', primaryColors: ['black', 'white'], habitat: ['arctic'], diet: ['plankton'], distinctiveFeatures: ['small auklet', 'arctic'] },
  'Least Flycatcher': { size: 'very small', primaryColors: ['gray', 'white'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['gray upperparts', 'white eye ring'] },
  'Least Tern': { size: 'small', primaryColors: ['gray', 'white'], habitat: ['beaches'], diet: ['fish'], distinctiveFeatures: ['small tern', 'yellow bill'] },
  'Lincoln Sparrow': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['thickets'], diet: ['seeds'], distinctiveFeatures: ['buff breast', 'brown streaked'] },
  'Loggerhead Shrike': { size: 'medium', primaryColors: ['gray', 'black'], habitat: ['open areas'], diet: ['small animals'], distinctiveFeatures: ['black mask', 'predatory'] },
  'Long Tailed Jaeger': { size: 'medium', primaryColors: ['brown', 'white'], habitat: ['arctic'], diet: ['small animals'], distinctiveFeatures: ['long tail', 'arctic'] },
  'Louisiana Waterthrush': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['streams'], diet: ['insects'], distinctiveFeatures: ['streaked breast', 'streamside'] },
  
  // M
  'Magnolia Warbler': { size: 'very small', primaryColors: ['yellow', 'black'], habitat: ['spruce forest'], diet: ['insects'], distinctiveFeatures: ['yellow underparts', 'black necklace'] },
  'Mallard': { size: 'large', primaryColors: ['green', 'brown'], habitat: ['water'], diet: ['aquatic plants'], distinctiveFeatures: ['green head', 'common duck'] },
  'Mangrove Cuckoo': { size: 'medium', primaryColors: ['brown', 'buff'], habitat: ['mangroves'], diet: ['insects'], distinctiveFeatures: ['buff underparts', 'mangrove habitat'] },
  'Marsh Wren': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['marshes'], diet: ['insects'], distinctiveFeatures: ['marsh dweller', 'brown streaked'] },
  'Mockingbird': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['urban', 'open areas'], diet: ['insects', 'fruit'], distinctiveFeatures: ['mimic song', 'white wing patches'] },
  'Mourning Warbler': { size: 'very small', primaryColors: ['yellow', 'gray'], habitat: ['dense thickets'], diet: ['insects'], distinctiveFeatures: ['gray hood', 'yellow underparts'] },
  'Myrtle Warbler': { size: 'very small', primaryColors: ['yellow', 'blue'], habitat: ['coniferous forest'], diet: ['insects'], distinctiveFeatures: ['yellow rump', 'blue-gray'] },
  
  // N
  'Nashville Warbler': { size: 'very small', primaryColors: ['yellow', 'gray'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['gray head', 'yellow underparts'] },
  'Nelson Sharp Tailed Sparrow': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['salt marshes'], diet: ['seeds'], distinctiveFeatures: ['orange face', 'salt marsh'] },
  'Nighthawk': { size: 'medium', primaryColors: ['brown', 'white'], habitat: ['urban', 'open areas'], diet: ['flying insects'], distinctiveFeatures: ['nocturnal', 'white wing bars'] },
  'Northern Flicker': { size: 'medium', primaryColors: ['brown', 'black'], habitat: ['open woodlands'], diet: ['ants'], distinctiveFeatures: ['brown body', 'black spots'] },
  'Northern Fulmar': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['ocean'], diet: ['fish', 'squid'], distinctiveFeatures: ['tube nose', 'oceanic'] },
  'Northern Waterthrush': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['streams'], diet: ['insects'], distinctiveFeatures: ['streaked breast', 'bobbing tail'] },
  
  // O
  'Olive Sided Flycatcher': { size: 'medium', primaryColors: ['dark brown', 'white'], habitat: ['coniferous forest'], diet: ['insects'], distinctiveFeatures: ['dark sides', 'white breast patch'] },
  'Orange Crowned Warbler': { size: 'very small', primaryColors: ['olive', 'yellow'], habitat: ['thickets'], diet: ['insects'], distinctiveFeatures: ['orange crown', 'olive green'] },
  'Orchard Oriole': { size: 'small', primaryColors: ['chestnut', 'black'], habitat: ['orchards'], diet: ['insects', 'fruit'], distinctiveFeatures: ['chestnut body', 'black head'] },
  'Ovenbird': { size: 'small', primaryColors: ['olive', 'brown'], habitat: ['forest floor'], diet: ['insects'], distinctiveFeatures: ['orange crown', 'ground nester'] },
  
  // P
  'Pacific Loon': { size: 'medium', primaryColors: ['black', 'white'], habitat: ['lakes'], diet: ['fish'], distinctiveFeatures: ['checkered back', 'arctic breeder'] },
  'Painted Bunting': { size: 'small', primaryColors: ['blue', 'green', 'red'], habitat: ['brushy areas'], diet: ['seeds'], distinctiveFeatures: ['rainbow colors', 'colorful'] },
  'Palm Warbler': { size: 'very small', primaryColors: ['yellow', 'brown'], habitat: ['bogs'], diet: ['insects'], distinctiveFeatures: ['bobbing tail', 'yellow underparts'] },
  'Parakeet Auklet': { size: 'small', primaryColors: ['black', 'white'], habitat: ['arctic'], diet: ['plankton'], distinctiveFeatures: ['white plume', 'arctic'] },
  'Pelagic Cormorant': { size: 'medium', primaryColors: ['black'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['iridescent black', 'coastal'] },
  'Philadelphia Vireo': { size: 'small', primaryColors: ['yellow', 'olive'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['yellow underparts', 'olive upperparts'] },
  'Pied Billed Grebe': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['marshes'], diet: ['aquatic life'], distinctiveFeatures: ['pied bill', 'marsh dweller'] },
  'Pied Kingfisher': { size: 'medium', primaryColors: ['black', 'white'], habitat: ['waterways'], diet: ['fish'], distinctiveFeatures: ['black and white', 'hovering'] },
  'Pigeon Guillemot': { size: 'medium', primaryColors: ['black', 'white'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['red feet', 'black body'] },
  'Pileated Woodpecker': { size: 'very large', primaryColors: ['black', 'white', 'red'], habitat: ['mature forest'], diet: ['carpenter ants'], distinctiveFeatures: ['large size', 'red crest'] },
  'Pine Grosbeak': { size: 'medium', primaryColors: ['red', 'gray'], habitat: ['coniferous forest'], diet: ['seeds', 'buds'], distinctiveFeatures: ['red body', 'large bill'] },
  'Pine Warbler': { size: 'very small', primaryColors: ['yellow', 'olive'], habitat: ['pine forest'], diet: ['insects'], distinctiveFeatures: ['yellow breast', 'pine habitat'] },
  'Pomarine Jaeger': { size: 'medium', primaryColors: ['brown', 'white'], habitat: ['arctic'], diet: ['kleptoparasite'], distinctiveFeatures: ['twisted tail', 'arctic'] },
  'Prairie Warbler': { size: 'very small', primaryColors: ['yellow', 'olive'], habitat: ['scrub'], diet: ['insects'], distinctiveFeatures: ['yellow underparts', 'black streaks'] },
  'Prothonotary Warbler': { size: 'very small', primaryColors: ['yellow', 'blue'], habitat: ['swamps'], diet: ['insects'], distinctiveFeatures: ['golden yellow', 'swamp nester'] },
  'Purple Finch': { size: 'small', primaryColors: ['raspberry', 'brown'], habitat: ['forest'], diet: ['seeds'], distinctiveFeatures: ['raspberry red', 'brown streaks'] },
  
  // R
  'Red Bellied Woodpecker': { size: 'medium', primaryColors: ['red', 'black', 'white'], habitat: ['forest'], diet: ['insects', 'nuts'], distinctiveFeatures: ['red cap', 'black and white back'] },
  'Red Breasted Merganser': { size: 'medium', primaryColors: ['green', 'brown', 'white'], habitat: ['water'], diet: ['fish'], distinctiveFeatures: ['shaggy crest', 'fish eater'] },
  'Red Cockaded Woodpecker': { size: 'small', primaryColors: ['black', 'white'], habitat: ['pine forest'], diet: ['insects'], distinctiveFeatures: ['black cap', 'white cheeks'] },
  'Red Eyed Vireo': { size: 'small', primaryColors: ['olive', 'white'], habitat: ['forest canopy'], diet: ['insects'], distinctiveFeatures: ['red eyes', 'olive upperparts'] },
  'Red Faced Cormorant': { size: 'medium', primaryColors: ['black'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['red face', 'coastal'] },
  'Red Headed Woodpecker': { size: 'medium', primaryColors: ['red', 'black', 'white'], habitat: ['open woodlands'], diet: ['insects', 'nuts'], distinctiveFeatures: ['entirely red head', 'black and white body'] },
  'Red Legged Kittiwake': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['coastal cliffs'], diet: ['fish'], distinctiveFeatures: ['red legs', 'black wingtips'] },
  'Red Winged Blackbird': { size: 'medium', primaryColors: ['black', 'red', 'yellow'], habitat: ['wetlands'], diet: ['seeds', 'insects'], distinctiveFeatures: ['red shoulder patches', 'black body'] },
  'Rhinoceros Auklet': { size: 'medium', primaryColors: ['black', 'white'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['rhinoceros horn', 'nocturnal'] },
  'Ring Billed Gull': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['lakes', 'coastal'], diet: ['fish', 'scavenger'], distinctiveFeatures: ['black ring on bill', 'yellow legs'] },
  'Ringed Kingfisher': { size: 'large', primaryColors: ['blue', 'white'], habitat: ['tropical waterways'], diet: ['fish'], distinctiveFeatures: ['large size', 'blue upperparts'] },
  'Rock Wren': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['rocky areas'], diet: ['insects'], distinctiveFeatures: ['rocky habitat', 'brown body'] },
  'Rose Breasted Grosbeak': { size: 'medium', primaryColors: ['black', 'white', 'rose'], habitat: ['forest'], diet: ['seeds', 'insects'], distinctiveFeatures: ['rose breast', 'black and white'] },
  'Ruby Throated Hummingbird': { size: 'very small', primaryColors: ['green', 'red'], habitat: ['gardens'], diet: ['nectar'], distinctiveFeatures: ['iridescent green', 'red throat'] },
  'Rufous Hummingbird': { size: 'very small', primaryColors: ['rufous', 'orange'], habitat: ['mountains'], diet: ['nectar'], distinctiveFeatures: ['rufous color', 'aggressive'] },
  'Rusty Blackbird': { size: 'medium', primaryColors: ['black', 'rusty'], habitat: ['wetlands'], diet: ['insects'], distinctiveFeatures: ['rusty edges', 'wetland bird'] },
  
  // S
  'Sage Thrasher': { size: 'medium', primaryColors: ['gray', 'white'], habitat: ['sagebrush'], diet: ['insects'], distinctiveFeatures: ['sage habitat', 'white wing bars'] },
  'Savannah Sparrow': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['grasslands'], diet: ['seeds'], distinctiveFeatures: ['yellow lores', 'grassland'] },
  'Sayornis': { size: 'small', primaryColors: ['gray', 'white'], habitat: ['open areas'], diet: ['insects'], distinctiveFeatures: ['gray upperparts', 'white underparts'] },
  'Scarlet Tanager': { size: 'small', primaryColors: ['red', 'black'], habitat: ['forest canopy'], diet: ['insects'], distinctiveFeatures: ['bright red', 'black wings'] },
  'Scissor Tailed Flycatcher': { size: 'medium', primaryColors: ['gray', 'white', 'salmon'], habitat: ['open country'], diet: ['insects'], distinctiveFeatures: ['extremely long tail', 'pink sides'] },
  'Scott Oriole': { size: 'medium', primaryColors: ['yellow', 'black'], habitat: ['desert'], diet: ['insects', 'nectar'], distinctiveFeatures: ['yellow body', 'black head'] },
  'Seaside Sparrow': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['salt marshes'], diet: ['seeds'], distinctiveFeatures: ['salt marsh', 'brown streaked'] },
  'Shiny Cowbird': { size: 'small', primaryColors: ['black'], habitat: ['open areas'], diet: ['seeds'], distinctiveFeatures: ['iridescent black', 'brood parasite'] },
  'Slaty Backed Gull': { size: 'large', primaryColors: ['gray', 'white'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['slate gray back', 'coastal'] },
  'Song Sparrow': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['thickets'], diet: ['seeds'], distinctiveFeatures: ['brown streaks', 'musical song'] },
  'Sooty Albatross': { size: 'very large', primaryColors: ['dark brown'], habitat: ['ocean'], diet: ['squid'], distinctiveFeatures: ['dark plumage', 'oceanic'] },
  'Spotted Catbird': { size: 'medium', primaryColors: ['green', 'white'], habitat: ['rainforest'], diet: ['fruit'], distinctiveFeatures: ['spotted breast', 'tropical'] },
  'Summer Tanager': { size: 'medium', primaryColors: ['red'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['all red', 'bee specialist'] },
  'Swainson Warbler': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['swamps'], diet: ['insects'], distinctiveFeatures: ['brown upperparts', 'white underparts'] },
  
  // T
  'Tennessee Warbler': { size: 'very small', primaryColors: ['yellow', 'gray'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['gray head', 'yellow underparts'] },
  'Tree Sparrow': { size: 'small', primaryColors: ['brown', 'gray'], habitat: ['forest edges'], diet: ['seeds'], distinctiveFeatures: ['red cap', 'brown streaked'] },
  'Tree Swallow': { size: 'small', primaryColors: ['blue', 'green', 'white'], habitat: ['open areas near water'], diet: ['flying insects'], distinctiveFeatures: ['iridescent blue-green', 'white underparts'] },
  'Tropical Kingbird': { size: 'medium', primaryColors: ['yellow', 'gray'], habitat: ['tropical'], diet: ['insects'], distinctiveFeatures: ['yellow underparts', 'gray head'] },
  'Vermilion Flycatcher': { size: 'small', primaryColors: ['red', 'brown'], habitat: ['desert'], diet: ['insects'], distinctiveFeatures: ['bright red', 'desert'] },
  'Vesper Sparrow': { size: 'small', primaryColors: ['brown', 'white'], habitat: ['grasslands'], diet: ['seeds'], distinctiveFeatures: ['white eye ring', 'grassland'] },
  'Warbling Vireo': { size: 'small', primaryColors: ['olive', 'white'], habitat: ['forest'], diet: ['insects'], distinctiveFeatures: ['olive upperparts', 'white underparts'] },
  
  // W
  'Western Grebe': { size: 'large', primaryColors: ['black', 'white'], habitat: ['lakes'], diet: ['fish'], distinctiveFeatures: ['long neck', 'black and white'] },
  'Western Gull': { size: 'large', primaryColors: ['gray', 'white'], habitat: ['coastal'], diet: ['fish'], distinctiveFeatures: ['dark gray back', 'coastal'] },
  'Western Meadowlark': { size: 'medium', primaryColors: ['yellow', 'brown'], habitat: ['grasslands'], diet: ['insects'], distinctiveFeatures: ['yellow breast', 'black V'] },
  'Western Wood Pewee': { size: 'small', primaryColors: ['gray', 'white'], habitat: ['woodlands'], diet: ['insects'], distinctiveFeatures: ['gray upperparts', 'white underparts'] },
  'Whip Poor Will': { size: 'medium', primaryColors: ['brown', 'gray'], habitat: ['woodlands'], diet: ['insects'], distinctiveFeatures: ['nocturnal', 'camouflaged'] },
  'White Breasted Kingfisher': { size: 'medium', primaryColors: ['blue', 'white'], habitat: ['waterways'], diet: ['fish'], distinctiveFeatures: ['white breast', 'blue upperparts'] },
  'White Breasted Nuthatch': { size: 'small', primaryColors: ['blue', 'white'], habitat: ['forest'], diet: ['insects', 'nuts'], distinctiveFeatures: ['white breast', 'tree climber'] },
  'White Crowned Sparrow': { size: 'medium', primaryColors: ['brown', 'gray', 'white'], habitat: ['thickets'], diet: ['seeds'], distinctiveFeatures: ['black and white head', 'brown body'] },
  'White Eyed Vireo': { size: 'small', primaryColors: ['yellow', 'olive'], habitat: ['thickets'], diet: ['insects'], distinctiveFeatures: ['white eyes', 'yellow spectacles'] },
  'White Necked Raven': { size: 'large', primaryColors: ['black'], habitat: ['open areas'], diet: ['omnivore'], distinctiveFeatures: ['white neck', 'large raven'] },
  'White Pelican': { size: 'very large', primaryColors: ['white', 'black'], habitat: ['lakes'], diet: ['fish'], distinctiveFeatures: ['large bill pouch', 'white plumage'] },
  'White Throated Sparrow': { size: 'medium', primaryColors: ['brown', 'gray', 'white'], habitat: ['forest'], diet: ['seeds'], distinctiveFeatures: ['white throat', 'yellow lores'] },
  'Wilson Warbler': { size: 'very small', primaryColors: ['yellow', 'black'], habitat: ['thickets'], diet: ['insects'], distinctiveFeatures: ['black cap', 'yellow body'] },
  'Winter Wren': { size: 'very small', primaryColors: ['brown'], habitat: ['forest undergrowth'], diet: ['insects'], distinctiveFeatures: ['small brown', 'cocked tail'] },
  'Worm Eating Warbler': { size: 'very small', primaryColors: ['olive', 'buff'], habitat: ['forest floor'], diet: ['insects'], distinctiveFeatures: ['buff head stripes', 'ground forager'] },
  
  // Y
  'Yellow Bellied Flycatcher': { size: 'small', primaryColors: ['yellow', 'olive'], habitat: ['boreal forest'], diet: ['insects'], distinctiveFeatures: ['yellow underparts', 'olive upperparts'] },
  'Yellow Billed Cuckoo': { size: 'medium', primaryColors: ['brown', 'white'], habitat: ['woodlands'], diet: ['insects'], distinctiveFeatures: ['yellow bill', 'long tail'] },
  'Yellow Breasted Chat': { size: 'medium', primaryColors: ['yellow', 'olive'], habitat: ['thickets'], diet: ['insects'], distinctiveFeatures: ['bright yellow breast', 'large warbler'] },
  'Yellow Headed Blackbird': { size: 'medium', primaryColors: ['yellow', 'black'], habitat: ['marshes'], diet: ['seeds', 'insects'], distinctiveFeatures: ['yellow head', 'black body'] },
  'Yellow Throated Vireo': { size: 'small', primaryColors: ['yellow', 'olive'], habitat: ['forest canopy'], diet: ['insects'], distinctiveFeatures: ['yellow throat', 'olive upperparts'] },
  'Yellow Warbler': { size: 'very small', primaryColors: ['yellow'], habitat: ['wetlands'], diet: ['insects'], distinctiveFeatures: ['all yellow', 'red streaks'] }
};

function getBirdAttributes(birdName) {
  return birdAttributes[birdName] || {
    size: 'medium',
    primaryColors: ['brown'],
    habitat: ['forest'],
    diet: ['insects'],
    distinctiveFeatures: ['songbird']
  };
}

async function enhanceAllBirds() {
  console.log('Adding realistic attributes to ALL birds...\n');
  
  const allBirds = await Bird.find();
  let enhancedCount = 0;

  for (const bird of allBirds) {
    const realisticAttributes = getBirdAttributes(bird.commonName);

    const result = await Bird.updateOne(
      { _id: bird._id },
      { $set: { attributes: realisticAttributes } }
    );
    
    if (result.modifiedCount > 0) {
      enhancedCount++;
      console.log(`✅ ${bird.commonName}`);
    }
  }
  
  console.log(`\n🎉 COMPLETED! Enhanced ${enhancedCount} birds with realistic attributes!`);
  mongoose.connection.close();
}

enhanceAllBirds().catch(console.error);