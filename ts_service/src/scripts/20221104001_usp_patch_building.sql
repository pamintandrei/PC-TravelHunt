CREATE OR ALTER PROCEDURE usp_patch_building
			@id_building INTEGER,
            @bld_name  VARCHAR(200)=null,
            @bld_location   VARCHAR(200)=null,
			@x_coordinate REAL=null,
			@y_coordinate REAL=null,
			@bld_description   VARCHAR(MAX)=null,
			@bld_image   VARCHAR(MAX)=null,
			@tags VARCHAR(MAX)=null

AS
BEGIN

    UPDATE Buildings SET bld_name= ISNULL(@bld_name,bld_name), bld_location=ISNULL(@bld_location,bld_location),
	x_coordinate=ISNULL(@x_coordinate,x_coordinate), y_coordinate=ISNULL(@y_coordinate,y_coordinate),
	bld_description= ISNULL(@bld_description,bld_description), bld_image=ISNULL(@bld_image,bld_image),
	tags= ISNULL(@tags,tags)
	WHERE  id_building = @id_building;  
	Return 0;
END
