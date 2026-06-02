CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE product_categories (
    id UUID PRIMARY KEY,
    parent_id UUID REFERENCES product_categories(id),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE products (
    id UUID PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES product_categories(id),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sku TEXT UNIQUE,
    brand TEXT,
    short_description TEXT NOT NULL,
    description TEXT,
    price NUMERIC(18, 2),
    price_label TEXT NOT NULL CHECK (price_label IN ('fixed', 'from', 'contact')),
    images JSONB NOT NULL DEFAULT '[]',
    specs JSONB NOT NULL DEFAULT '{}',
    compatible_vehicles JSONB NOT NULL DEFAULT '[]',
    tags TEXT[] NOT NULL DEFAULT '{}',
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE service_categories (
    id UUID PRIMARY KEY,
    parent_id UUID REFERENCES service_categories(id),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE services (
    id UUID PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES service_categories(id),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    description TEXT,
    hero_image_url TEXT,
    gallery JSONB NOT NULL DEFAULT '[]',
    base_price NUMERIC(18, 2),
    price_label TEXT NOT NULL CHECK (price_label IN ('fixed', 'from', 'contact')),
    estimated_duration_minutes INT,
    related_product_ids UUID[] NOT NULL DEFAULT '{}',
    faqs JSONB NOT NULL DEFAULT '[]',
    seo JSONB NOT NULL DEFAULT '{}',
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE branches (
    id UUID PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    province TEXT NOT NULL,
    district TEXT,
    address TEXT NOT NULL,
    phone_numbers TEXT[] NOT NULL DEFAULT '{}',
    email TEXT,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    google_map_url TEXT,
    opening_hours TEXT,
    services UUID[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE articles (
    id UUID PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    category TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    author_name TEXT,
    published_at TIMESTAMPTZ,
    seo JSONB NOT NULL DEFAULT '{}',
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE customers (
    id UUID PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT,
    source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE vehicles (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customers(id),
    plate_number TEXT,
    brand TEXT,
    model TEXT,
    year INT,
    vin TEXT,
    color TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE leads (
    id UUID PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    vehicle_id UUID REFERENCES vehicles(id),
    branch_id UUID REFERENCES branches(id),
    requested_service_id UUID REFERENCES services(id),
    message TEXT,
    status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'quoted', 'booked', 'lost')),
    source TEXT,
    ai_summary TEXT,
    ai_intent TEXT,
    ai_score INT CHECK (ai_score BETWEEN 0 AND 100),
    ai_suggested_next_action TEXT,
    ai_extracted_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE employees (
    id UUID PRIMARY KEY,
    branch_id UUID REFERENCES branches(id),
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customers(id),
    vehicle_id UUID REFERENCES vehicles(id),
    branch_id UUID NOT NULL REFERENCES branches(id),
    assigned_employee_id UUID REFERENCES employees(id),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'checked_in', 'in_progress', 'completed', 'cancelled', 'no_show')),
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE quotations (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customers(id),
    vehicle_id UUID REFERENCES vehicles(id),
    branch_id UUID REFERENCES branches(id),
    lead_id UUID REFERENCES leads(id),
    status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
    subtotal NUMERIC(18, 2) NOT NULL DEFAULT 0,
    discount NUMERIC(18, 2) NOT NULL DEFAULT 0,
    total NUMERIC(18, 2) NOT NULL DEFAULT 0,
    valid_until TIMESTAMPTZ,
    requires_human_review BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE quotation_items (
    id UUID PRIMARY KEY,
    quotation_id UUID NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('product', 'service', 'labor')),
    product_id UUID REFERENCES products(id),
    service_id UUID REFERENCES services(id),
    name TEXT NOT NULL,
    quantity NUMERIC(18, 2) NOT NULL DEFAULT 1,
    unit_price NUMERIC(18, 2) NOT NULL DEFAULT 0,
    total NUMERIC(18, 2) NOT NULL DEFAULT 0
);

CREATE TABLE job_cards (
    id UUID PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id),
    quotation_id UUID REFERENCES quotations(id),
    customer_id UUID NOT NULL REFERENCES customers(id),
    vehicle_id UUID REFERENCES vehicles(id),
    branch_id UUID NOT NULL REFERENCES branches(id),
    status TEXT NOT NULL CHECK (status IN ('created', 'inspection', 'waiting_parts', 'in_progress', 'qc', 'completed', 'cancelled')),
    odometer_km INT,
    fuel_level TEXT,
    customer_complaint TEXT,
    internal_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY,
    actor_user_id UUID,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    before_json JSONB,
    after_json JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ai_interactions (
    id UUID PRIMARY KEY,
    session_id TEXT NOT NULL,
    user_id UUID,
    lead_id UUID REFERENCES leads(id),
    interaction_type TEXT NOT NULL,
    input_text TEXT,
    output_text TEXT,
    model_name TEXT,
    prompt_tokens INT,
    completion_tokens INT,
    total_cost NUMERIC(18, 6),
    latency_ms INT,
    safety_flags JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX ix_products_category_id ON products(category_id);
CREATE INDEX ix_products_is_active ON products(is_active);
CREATE INDEX ix_services_category_id ON services(category_id);
CREATE INDEX ix_services_is_active ON services(is_active);
CREATE INDEX ix_branches_province ON branches(province);
CREATE INDEX ix_branches_is_active ON branches(is_active);
CREATE INDEX ix_articles_is_published ON articles(is_published);
CREATE INDEX ix_articles_published_at ON articles(published_at DESC);
CREATE INDEX ix_leads_status ON leads(status);
CREATE INDEX ix_leads_branch_id ON leads(branch_id);
CREATE INDEX ix_leads_created_at ON leads(created_at DESC);
CREATE INDEX ix_bookings_branch_time ON bookings(branch_id, start_time, end_time);
CREATE INDEX ix_job_cards_status ON job_cards(status);
