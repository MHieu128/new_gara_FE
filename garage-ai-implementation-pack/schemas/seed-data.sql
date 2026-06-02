INSERT INTO product_categories (id, name, slug, description, image_url, sort_order)
VALUES ('00000000-0000-0000-0000-000000000101','Ánh sáng','anh-sang','Đèn tăng sáng, Bi LED, Bi Laser, Bi gầm.','/images/categories/anh-sang.webp',1);

INSERT INTO service_categories (id, name, slug, description, image_url, sort_order)
VALUES ('00000000-0000-0000-0000-000000000201','Nâng cấp ánh sáng','nang-cap-anh-sang','Dịch vụ độ đèn, tăng sáng và cân chỉnh ánh sáng.','/images/service-categories/lighting.webp',1);

INSERT INTO products (id, category_id, name, slug, sku, brand, short_description, description, price, price_label, images, specs, compatible_vehicles, tags, is_featured, is_active)
VALUES ('00000000-0000-0000-0000-000000000301','00000000-0000-0000-0000-000000000101','Bi LED X-Light Quantum X V2','bi-led-xlight-quantum-x-v2','XLIGHT-QX-V2','X-Light','Bi LED tăng sáng cho xe ô tô, phù hợp nhu cầu đi đêm nhiều.','Sản phẩm dành cho khách hàng muốn nâng cấp ánh sáng, cải thiện tầm nhìn khi lái xe ban đêm.',13500000,'fixed','["/images/products/xlight-quantum-x-v2-1.webp"]','{"Ứng dụng":"Đèn cos/pha ô tô","Bảo hành":"Liên hệ gara"}','[{"brand":"Toyota"},{"brand":"Mazda"},{"brand":"Ford"}]',ARRAY['bi-led','tang-sang','den-o-to'],TRUE,TRUE);
