CREATE or ALTER PROCEDURE [dbo].[usp_save_building] 
            @bld_name  VARCHAR(200),
            @bld_location   VARCHAR(200),
			@x_coordinate REAL,
			@y_coordinate REAL,
			@bld_description   VARCHAR(MAX),
			@bld_image   VARCHAR(MAX),
			@tags VARCHAR(MAX)
AS
BEGIN
	INSERT INTO Buildings(bld_name, bld_location, x_coordinate, y_coordinate, bld_description, bld_image, tags) 
	VALUES(@bld_name, @bld_location, @x_coordinate, @y_coordinate, @bld_description, @bld_image, @tags); 
	SELECT SCOPE_IDENTITY() AS id_building;
END
