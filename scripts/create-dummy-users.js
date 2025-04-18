// Script to create dummy admin and manager users in Supabase
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://zvaudgjyiqwmbqqeyprs.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2YXVkZ2p5aXF3bWJxcWV5cHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MTAwMzYsImV4cCI6MjA2MDQ4NjAzNn0.AWlNNBwHCygqavi5vtUo8UgI4GtHBgJbKZVReoUacgM";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createDummyUsers() {
  // Admin user
  const { error: adminError } = await supabase.auth.signUp({
    email: 'bacahin157@f5url.com',
    password: 'Admin@123',
    options: {
      data: {
        name: 'Admin User',
        role: 'admin'
      }
    }
  });
  
  if (adminError) {
    console.error('Admin user creation failed:', adminError.message);
  } else {
    console.log('Admin user created successfully');
  }
  
  // Manager user
  const { error: managerError } = await supabase.auth.signUp({
    email: 'nifawev124@agiuse.com',
    password: 'Manager@123',
    options: {
      data: {
        name: 'Manager User',
        role: 'manager'
      }
    }
  });
  
  if (managerError) {
    console.error('Manager user creation failed:', managerError.message);
  } else {
    console.log('Manager user created successfully');
  }
  
  console.log('\nLogin credentials:');
  console.log('Admin: admin@example.com / Admin@123');
  console.log('Manager: manager@example.com / Manager@123');
}

createDummyUsers();
