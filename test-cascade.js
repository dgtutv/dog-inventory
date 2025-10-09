// Load environment variables first
require('dotenv').config();

const {
    getAllDogs, getDog, newDog, removeDog,
    getAllStylists, getStylist, newStylist, removeStylist,
    getAllOwners, getOwner, newOwner, removeOwner,
    getAllHaircuts, getHaircut, newHaircut, removeHaircut
} = require('./db/queries');

console.log('🗑️ Testing CASCADE and SET NULL behavior...\n');

async function testCascadeAndSetNull() {
    try {
        console.log('='.repeat(60));
        console.log('🧪 SETUP: Creating test data');
        console.log('='.repeat(60));

        // Create a test stylist
        const testStylist = await newStylist('Test Stylist for Deletion');
        console.log(`✅ Created test stylist: ID ${testStylist.employeeId} - ${testStylist.name}`);

        // Create a test dog with this stylist
        const testDog = await newDog(1, testStylist.employeeId); // breed=1, stylist=testStylist
        console.log(`✅ Created test dog: ID ${testDog.id} with stylist ${testDog.preferredStylist}`);

        // Create test haircuts for this dog
        const haircut1 = await newHaircut('Test Cut 1', 'First test haircut', 50.00, testDog.id);
        const haircut2 = await newHaircut('Test Cut 2', 'Second test haircut', 60.00, testDog.id);
        console.log(`✅ Created haircuts: ${haircut1.id} and ${haircut2.id} for dog ${testDog.id}`);

        // Create test owner for this dog
        const testOwner = await newOwner('Test Owner', 'test@example.com', 5551234567, testDog.id);
        console.log(`✅ Created test owner: ID ${testOwner.id} - ${testOwner.name} owns dog ${testOwner.dogs}`);

        console.log('\n' + '='.repeat(60));
        console.log('🧪 TEST 1: DELETE STYLIST (should SET NULL)');
        console.log('='.repeat(60));

        console.log(`\n🔍 Before deleting stylist ${testStylist.employeeId}:`);
        const dogBeforeStyleDelete = await getDog(testDog.id);
        console.log(`   Dog ${testDog.id} preferred stylist: ${dogBeforeStyleDelete.preferredStylist}`);

        // Delete the stylist - should set dog's preferredStylist to NULL
        console.log(`\n🗑️ Deleting stylist ${testStylist.employeeId}...`);
        const stylistDeleteResult = await removeStylist(testStylist.employeeId);
        console.log(`✅ Deleted stylist: ${stylistDeleteResult} row(s) affected`);

        console.log('\n🔍 After deleting stylist:');
        const dogAfterStyleDelete = await getDog(testDog.id);
        console.log(`   Dog ${testDog.id} preferred stylist: ${dogAfterStyleDelete.preferredStylist} (should be null)`);

        if (dogAfterStyleDelete.preferredStylist === null) {
            console.log('✅ SUCCESS: Dog\'s preferredStylist was set to NULL');
        } else {
            console.log('❌ FAILED: Dog\'s preferredStylist was not set to NULL');
        }

        console.log('\n' + '='.repeat(60));
        console.log('🧪 TEST 2: DELETE DOG (should CASCADE haircuts and owner)');
        console.log('='.repeat(60));

        console.log('\n🔍 Before deleting dog:');
        const haircutsBeforeDelete = await getAllHaircuts();
        const dogHaircutsBefore = haircutsBeforeDelete.filter(h => h.dog === testDog.id);
        console.log(`   Dog ${testDog.id} has ${dogHaircutsBefore.length} haircuts`);

        const ownersBeforeDelete = await getAllOwners();
        const dogOwnersBefore = ownersBeforeDelete.filter(o => o.dogs === testDog.id);
        console.log(`   Dog ${testDog.id} has ${dogOwnersBefore.length} owner records`);

        // Delete the dog - should CASCADE delete haircuts and owner records
        console.log(`\n🗑️ Deleting dog ${testDog.id}...`);
        const dogDeleteResult = await removeDog(testDog.id);
        console.log(`✅ Deleted dog: ${dogDeleteResult} row(s) affected`);

        console.log('\n🔍 After deleting dog:');
        const haircutsAfterDelete = await getAllHaircuts();
        const dogHaircutsAfter = haircutsAfterDelete.filter(h => h.dog === testDog.id);
        console.log(`   Dog ${testDog.id} now has ${dogHaircutsAfter.length} haircuts (should be 0)`);

        const ownersAfterDelete = await getAllOwners();
        const dogOwnersAfter = ownersAfterDelete.filter(o => o.dogs === testDog.id);
        console.log(`   Dog ${testDog.id} now has ${dogOwnersAfter.length} owner records (should be 0)`);

        if (dogHaircutsAfter.length === 0) {
            console.log('✅ SUCCESS: Dog\'s haircuts were CASCADE deleted');
        } else {
            console.log('❌ FAILED: Dog\'s haircuts were not CASCADE deleted');
        }

        if (dogOwnersAfter.length === 0) {
            console.log('✅ SUCCESS: Dog\'s owner records were CASCADE deleted');
        } else {
            console.log('❌ FAILED: Dog\'s owner records were not CASCADE deleted');
        }

        console.log('\n' + '='.repeat(60));
        console.log('🧪 TEST 3: Try to find deleted records');
        console.log('='.repeat(60));

        console.log('\n🔍 Checking if deleted records are gone:');
        const deletedDog = await getDog(testDog.id);
        console.log(`   Deleted dog lookup: ${deletedDog ? 'FOUND (ERROR)' : 'NOT FOUND (CORRECT)'}`);

        const deletedStylist = await getStylist(testStylist.employeeId);
        console.log(`   Deleted stylist lookup: ${deletedStylist ? 'FOUND (ERROR)' : 'NOT FOUND (CORRECT)'}`);

        console.log('\n' + '🎉'.repeat(20));
        console.log('✅ CASCADE AND SET NULL TESTS COMPLETED!');
        console.log('🎉'.repeat(20));

        console.log('\n📊 Summary of behaviors:');
        console.log('   🔗 When stylist deleted → dog.preferredStylist = NULL');
        console.log('   🔗 When dog deleted → haircuts CASCADE deleted');
        console.log('   🔗 When dog deleted → owner records CASCADE deleted');

    } catch (error) {
        console.error('❌ Error during cascade testing:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        process.exit(0);
    }
}

testCascadeAndSetNull();