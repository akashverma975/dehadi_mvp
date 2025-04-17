/*
  # Initial schema for Employee Attendance System

  1. New Tables
    - `clients`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    
    - `employees`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `client_id` (uuid, foreign key)
      - `created_at` (timestamp)
    
    - `attendance`
      - `id` (uuid, primary key)
      - `employee_id` (uuid, foreign key)
      - `client_id` (uuid, foreign key)
      - `date` (date)
      - `status` (text)
      - `type` (text)
      - `shift` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create clients table
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create employees table
CREATE TABLE employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id),
  created_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) NOT NULL,
  client_id uuid REFERENCES clients(id) NOT NULL,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present', 'absent')),
  type text NOT NULL CHECK (type IN ('full_day', 'half_day')),
  shift text NOT NULL CHECK (shift IN ('1st', '2nd', '3rd')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Policies for clients table
CREATE POLICY "Clients are viewable by authenticated users"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for employees table
CREATE POLICY "Employees are viewable by authenticated users"
  ON employees
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employees can update their own record"
  ON employees
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for attendance table
CREATE POLICY "Users can view their own attendance"
  ON attendance
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = employee_id OR
    EXISTS (
      SELECT 1 FROM employees e
      WHERE e.client_id IN (
        SELECT id FROM clients
        WHERE EXISTS (
          SELECT 1 FROM employees
          WHERE id = auth.uid() AND client_id = clients.id
        )
      )
    )
  );

CREATE POLICY "Users can insert their own attendance"
  ON attendance
  FOR INSERT
  TO authenticated
  WITH CHECK (employee_id = auth.uid());

CREATE POLICY "Users can update their own attendance"
  ON attendance
  FOR UPDATE
  TO authenticated
  USING (employee_id = auth.uid());