use travelhunt

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Buildings]'))
BEGIN
CREATE TABLE Buildings(
	id_building INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	bld_name VARCHAR(200),
	bld_location VARCHAR(200),
	x_coordinate REAL,
	y_coordinate REAL,
	bld_description VARCHAR(max),
	bld_image VARCHAR(max),
	tags VARCHAR(max)
	)
END