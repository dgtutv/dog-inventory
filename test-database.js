// Load environment variables first
require('dotenv').config();

const {
    // Dog functions
    getAllDogs, getDog, newDog, editDog, removeDog,
    // Breed functions
    getAllBreeds, getBreed, newBreed, editBreed, removeBreed,
    // Stylist functions
    getAllStylists, getStylist, newStylist, editStylist, removeStylist,
    // Owner functions
    getAllOwners, getOwner, newOwner, editOwner, removeOwner,
    // Haircut functions
    getAllHaircuts, getHaircut, newHaircut, editHaircut, removeHaircut
} = require('./db/queries');

console.log('🐕 Starting Dog Inventory Database Tests...\n');

async function testAllTables() {
    try {
        console.log('='.repeat(60));
        console.log('📊 TESTING BREED TABLE');
        console.log('='.repeat(60));

        // Test getAllBreeds
        console.log('\n🔍 Testing getAllBreeds...');
        const allBreeds = await getAllBreeds();
        console.log(`✅ Found ${allBreeds.length} breeds`);
        console.log('Sample breeds:', allBreeds.slice(0, 3).map(b => `${b.id}: ${b.name}`));

        // Test getBreed
        console.log('\n🔍 Testing getBreed...');
        const breed = await getBreed(1);
        console.log('✅ Breed with ID 1:', breed ? `${breed.name} - ${breed.description}` : 'Not found');

        // Test newBreed (find next available ID manually since auto-increment may not be set up)
        console.log('\n➕ Testing newBreed...');
        const maxBreedId = Math.max(...allBreeds.map(b => b.id)) + 1;
        const newBreedResult = await newBreed('Test Breed', 'A breed created for testing purposes');
        console.log('✅ Created new breed:', `ID ${newBreedResult.id}: ${newBreedResult.name}`);
        const testBreedId = newBreedResult.id;

        // Test editBreed
        console.log('\n✏️ Testing editBreed...');
        const editBreedResult = await editBreed(testBreedId, 'Updated Test Breed', 'Updated description for testing');
        console.log(`✅ Updated breed: ${editBreedResult} row(s) affected`);

        console.log('='.repeat(60));
        console.log('👨‍💼 TESTING STYLIST TABLE');
        console.log('='.repeat(60));

        // Test getAllStylists
        console.log('\n🔍 Testing getAllStylists...');
        const allStylists = await getAllStylists();
        console.log(`✅ Found ${allStylists.length} stylists`);
        console.log('Sample stylists:', allStylists.slice(0, 3).map(s => `${s.employeeId}: ${s.name}`));

        // Test getStylist
        console.log('\n🔍 Testing getStylist...');
        const stylist = await getStylist(1);
        console.log('✅ Stylist with ID 1:', stylist ? stylist.name : 'Not found');

        // Test newStylist
        console.log('\n➕ Testing newStylist...');
        const newStylistResult = await newStylist('Test Stylist');
        console.log('✅ Created new stylist:', `ID ${newStylistResult.employeeId}: ${newStylistResult.name}`);
        const testStylistId = newStylistResult.employeeId;

        // Test editStylist
        console.log('\n✏️ Testing editStylist...');
        const editStylistResult = await editStylist(testStylistId, 'Updated Test Stylist');
        console.log(`✅ Updated stylist: ${editStylistResult} row(s) affected`);

        console.log('='.repeat(60));
        console.log('🐕 TESTING DOG TABLE');
        console.log('='.repeat(60));

        // Test getAllDogs
        console.log('\n🔍 Testing getAllDogs...');
        const allDogs = await getAllDogs();
        console.log(`✅ Found ${allDogs.length} dogs`);
        console.log('Sample dogs:', allDogs.slice(0, 3).map(d => `ID ${d.id}: Breed ${d.breed}, Stylist ${d.preferredStylist}`));

        // Test getDog
        console.log('\n🔍 Testing getDog...');
        const dog = await getDog(1);
        console.log('✅ Dog with ID 1:', dog ? `Breed ${dog.breed}, Preferred Stylist ${dog.preferredStylist}` : 'Not found');

        // Test newDog
        console.log('\n➕ Testing newDog...');
        const newDogResult = await newDog(1, 1); // Use existing breed and stylist IDs
        console.log('✅ Created new dog:', `ID ${newDogResult.id}: Breed ${newDogResult.breed}, Stylist ${newDogResult.preferredStylist}`);
        const testDogId = newDogResult.id;

        // Test editDog
        console.log('\n✏️ Testing editDog...');
        const editDogResult = await editDog(testDogId, 2, 2);
        console.log(`✅ Updated dog: ${editDogResult} row(s) affected`);

        console.log('='.repeat(60));
        console.log('👤 TESTING OWNER TABLE');
        console.log('='.repeat(60));

        // Test getAllOwners
        console.log('\n🔍 Testing getAllOwners...');
        const allOwners = await getAllOwners();
        console.log(`✅ Found ${allOwners.length} owners`);
        console.log('Sample owners:', allOwners.slice(0, 3).map(o => `${o.id}: ${o.name} (${o.email})`));

        // Test getOwner
        console.log('\n🔍 Testing getOwner...');
        const owner = await getOwner(1);
        console.log('✅ Owner with ID 1:', owner ? `${owner.name} - ${owner.email}` : 'Not found');

        // Test newOwner
        console.log('\n➕ Testing newOwner...');
        const newOwnerResult = await newOwner('Test Owner', 'test@example.com', 5551234567, testDogId);
        console.log('✅ Created new owner:', `ID ${newOwnerResult.id}: ${newOwnerResult.name}`);
        const testOwnerId = newOwnerResult.id;

        // Test editOwner
        console.log('\n✏️ Testing editOwner...');
        const editOwnerResult = await editOwner(testOwnerId, 'Updated Test Owner', 'updated@example.com', 5559876543, testDogId);
        console.log(`✅ Updated owner: ${editOwnerResult} row(s) affected`);

        console.log('='.repeat(60));
        console.log('✂️ TESTING HAIRCUT TABLE');
        console.log('='.repeat(60));

        // Test getAllHaircuts
        console.log('\n🔍 Testing getAllHaircuts...');
        const allHaircuts = await getAllHaircuts();
        console.log(`✅ Found ${allHaircuts.length} haircuts`);
        console.log('Sample haircuts:', allHaircuts.slice(0, 3).map(h => `${h.id}: ${h.name} - $${h.price}`));

        // Test getHaircut
        console.log('\n🔍 Testing getHaircut...');
        const haircut = await getHaircut(1);
        console.log('✅ Haircut with ID 1:', haircut ? `${haircut.name} - $${haircut.price}` : 'Not found');

        // Test newHaircut
        console.log('\n➕ Testing newHaircut...');
        const newHaircutResult = await newHaircut('Test Cut', 'A test haircut', 50.00, testDogId);
        console.log('✅ Created new haircut:', `ID ${newHaircutResult.id}: ${newHaircutResult.name} - $${newHaircutResult.price}`);
        const testHaircutId = newHaircutResult.id;

        // Test editHaircut
        console.log('\n✏️ Testing editHaircut...');
        const editHaircutResult = await editHaircut(testHaircutId, 'Updated Test Cut', 'Updated test haircut', 75.00, testDogId);
        console.log(`✅ Updated haircut: ${editHaircutResult} row(s) affected`);

        console.log('\n' + '='.repeat(60));
        console.log('🧹 TESTING DELETE OPERATIONS (CLEANUP)');
        console.log('='.repeat(60));

        // Clean up test data (in correct order due to foreign keys)
        console.log('\n🗑️ Cleaning up test data...');

        const deleteHaircutResult = await removeHaircut(testHaircutId);
        console.log(`✅ Deleted test haircut: ${deleteHaircutResult} row(s) affected`);

        const deleteOwnerResult = await removeOwner(testOwnerId);
        console.log(`✅ Deleted test owner: ${deleteOwnerResult} row(s) affected`);

        const deleteDogResult = await removeDog(testDogId);
        console.log(`✅ Deleted test dog: ${deleteDogResult} row(s) affected`);

        const deleteStylistResult = await removeStylist(testStylistId);
        console.log(`✅ Deleted test stylist: ${deleteStylistResult} row(s) affected`);

        const deleteBreedResult = await removeBreed(testBreedId);
        console.log(`✅ Deleted test breed: ${deleteBreedResult} row(s) affected`);

        console.log('\n' + '='.repeat(60));
        console.log('🎉 RELATIONSHIP ANALYSIS');
        console.log('='.repeat(60));

        // Analyze relationships
        console.log('\n📊 Analyzing database relationships...');

        // Count dogs per stylist
        const dogsByStylists = {};
        const finalDogs = await getAllDogs();
        finalDogs.forEach(dog => {
            dogsByStylists[dog.preferredStylist] = (dogsByStylists[dog.preferredStylist] || 0) + 1;
        });

        console.log('\n👨‍💼 Dogs per stylist:');
        const finalStylists = await getAllStylists();
        finalStylists.forEach(stylist => {
            const count = dogsByStylists[stylist.employeeId] || 0;
            console.log(`   ${stylist.name}: ${count} dogs`);
        });

        // Count dogs per breed
        const dogsByBreed = {};
        finalDogs.forEach(dog => {
            dogsByBreed[dog.breed] = (dogsByBreed[dog.breed] || 0) + 1;
        });

        console.log('\n🐕 Dogs per breed:');
        const finalBreeds = await getAllBreeds();
        finalBreeds.forEach(breed => {
            const count = dogsByBreed[breed.id] || 0;
            console.log(`   ${breed.name}: ${count} dogs`);
        });

        // Count haircuts per dog
        const haircutsByDog = {};
        const finalHaircuts = await getAllHaircuts();
        finalHaircuts.forEach(haircut => {
            haircutsByDog[haircut.dog] = (haircutsByDog[haircut.dog] || 0) + 1;
        });

        console.log('\n✂️ Dogs with multiple haircuts:');
        Object.entries(haircutsByDog).forEach(([dogId, count]) => {
            if (count > 1) {
                console.log(`   Dog ID ${dogId}: ${count} haircuts`);
            }
        });

        // Count dogs per owner
        const dogsByOwner = {};
        const finalOwners = await getAllOwners();
        finalOwners.forEach(owner => {
            const ownerName = owner.name;
            dogsByOwner[ownerName] = (dogsByOwner[ownerName] || 0) + 1;
        });

        console.log('\n👤 Owners with multiple dogs:');
        Object.entries(dogsByOwner).forEach(([ownerName, count]) => {
            if (count > 1) {
                console.log(`   ${ownerName}: ${count} dogs`);
            }
        });

        console.log('\n' + '🎉'.repeat(20));
        console.log('✅ ALL TESTS COMPLETED SUCCESSFULLY!');
        console.log('🎉'.repeat(20));

    } catch (error) {
        console.error('❌ Error during testing:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        process.exit(0);
    }
}

testAllTables();