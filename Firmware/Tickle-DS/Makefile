#---------------------------------------------------------------------------------
.SUFFIXES:
#---------------------------------------------------------------------------------

ifeq ($(strip $(DEVKITARM)),)
$(error "Please set DEVKITARM in your environment. export DEVKITARM=<path to>devkitARM)
endif

include $(DEVKITARM)/ds_rules

#---------------------------------------------------------------------------------
# TARGET is the name of the output
# BUILD is the directory where object files & intermediate files will be placed
# SOURCES is a list of directories containing source code
# INCLUDES is a list of directories containing extra header files
#---------------------------------------------------------------------------------
TARGET		:=	pinky_walks
BUILD		:=	build
SOURCES		:=	gfx source data  
INCLUDES	:=	include build

GFX16SRC	:=	BigPinky/Bubbles BigPinky/Kitzel BigPinky/Allgemein Background/16BIT Extras/Menu Extras/Bubbles LittlePinky/Walk
GFX08SRC	:=	LittlePinky/Common Background/8BIT 
SOUNDSRC	:=	morebinaries
GFXROOT		:=	C:/Users/bseip/Pictures/Grafikexport
GFXHEADER	:=	source

DATAPREPARE	:=	dataprepare
DATA		:=	data


#---------------------------------------------------------------------------------
# options for code generation
#---------------------------------------------------------------------------------
ARCH	:=	-mthumb -mthumb-interwork

# note: arm9tdmi isn't the correct CPU arch, but anything newer and LD
# *insists* it has a FPU or VFP, and it won't take no for an answer!
CFLAGS	:=	 -dA -dm -save-temps   -g -Wall -O2\
 			-mcpu=arm9tdmi -mtune=arm9tdmi -fomit-frame-pointer\
			-ffast-math \
			$(ARCH)

CFLAGS	+=	$(INCLUDE) -DARM9
CXXFLAGS	:= $(CFLAGS)

ASFLAGS	:=	-g $(ARCH)
LDFLAGS	=	-specs=ds_arm9.specs -g $(ARCH) -mno-fpu -Wl,-Map,$(notdir $*.map)

#---------------------------------------------------------------------------------
# any extra libraries we wish to link with the project
#---------------------------------------------------------------------------------
LIBS	:= -lnds9
 
 
#---------------------------------------------------------------------------------
# list of directories containing libraries, this must be the top level containing
# include and lib
#---------------------------------------------------------------------------------
LIBDIRS	:=	$(LIBNDS)
 
#---------------------------------------------------------------------------------
# no real need to edit anything past this point unless you need to add additional
# rules for different file extensions
#---------------------------------------------------------------------------------
ifneq ($(BUILD),$(notdir $(CURDIR)))
#---------------------------------------------------------------------------------
 
export OUTPUT	:=	$(CURDIR)/$(TARGET)
 
export VPATH	:=	$(foreach dir,$(SOURCES),$(CURDIR)/$(dir))
export DEPSDIR	:=	$(CURDIR)/$(BUILD)

CFILES		:=	$(foreach dir,$(SOURCES),$(notdir $(wildcard $(dir)/*.c)))
CPPFILES	:=	$(foreach dir,$(SOURCES),$(notdir $(wildcard $(dir)/*.cpp)))
SFILES		:=	$(foreach dir,$(SOURCES),$(notdir $(wildcard $(dir)/*.s)))
BINFILES	:=	$(foreach dir,$(SOURCES),$(notdir $(wildcard $(dir)/*.bin)))


#---------------------------------------------------------------------------------
# use CXX for linking C++ projects, CC for standard C
#---------------------------------------------------------------------------------
ifeq ($(strip $(CPPFILES)),)
#---------------------------------------------------------------------------------
	export LD	:=	$(CC)
#---------------------------------------------------------------------------------
else
#---------------------------------------------------------------------------------
	export LD	:=	$(CXX)
#---------------------------------------------------------------------------------
endif
#---------------------------------------------------------------------------------

#export OFILES	:=	$(BINFILES:.bin=.o) \
#					$(CPPFILES:.cpp=.o) $(CFILES:.c=.o) $(SFILES:.s=.o)

#export OFILES	:=	$(CURDIR)/build/data.gbfs.o \
#					$(CPPFILES:.cpp=.o) $(CFILES:.c=.o) $(SFILES:.s=.o)

export OFILES	:=	$(CPPFILES:.cpp=.o) $(CFILES:.c=.o) $(SFILES:.s=.o)
 
export INCLUDE	:=	$(foreach dir,$(INCLUDES),-I$(CURDIR)/$(dir)) \
					$(foreach dir,$(LIBDIRS),-I$(dir)/include) \
					$(foreach dir,$(LIBDIRS),-I$(dir)/include) \
					-I$(CURDIR)/$(BUILD)
 
export LIBPATHS	:=	$(foreach dir,$(LIBDIRS),-L$(dir)/lib)

export GBFSFILES := $(notdir $(wildcard data/*.bin))

.PHONY: $(BUILD) clean binbuild
 
#---------------------------------------------------------------------------------
$(BUILD):
	@[ -d $@ ] || mkdir -p $@
	@make --no-print-directory -C $(BUILD) -f $(CURDIR)/Makefile
 
#---------------------------------------------------------------------------------

packbuild : $(wildcard,$(DATAPREPARE)/*.bin) binbuild
	@echo Clearing $(DATA)
	@rm -f $(DATA)/*
	@echo Packing $(DATAPREPARE) to $(DATA)
	@bin2packbin $(DATAPREPARE) $(DATA) $(GFXHEADER)
	@echo Building GBFS
	@cd $(DATA) && gbfs ../data.gbfs   $(GBFSFILES)
	@touch packbuild
	
	
binbuild : $(foreach dir,$(GFX16SRC),$(wildcard $(GFXROOT)/$(dir)/*.bin)) $(foreach dir,$(GFX08SRC),$(wildcard $(GFXROOT)/$(dir)/*.bin)) $(foreach dir,$(SOUNDSRC),$(wildcard $(dir)/*.bin)) $(GFXROOT)/BigPinky/Bubbles/lastbuild $(GFXROOT)/BigPinky/Kitzel/lastbuild $(GFXROOT)/Background/8BIT/lastbuild $(GFXROOT)/Background/16BIT/lastbuild $(GFXROOT)/Extras/Menu/lastbuild $(GFXROOT)/Extras/Bubbles/lastbuild $(GFXROOT)/LittlePinky/Common/lastbuild $(GFXROOT)/BigPinky/Allgemein/lastbuild $(GFXROOT)/LittlePinky/Walk/lastbuild
	@echo Clearing $(DATAPREPARE)
	@rm -f $(DATAPREPARE)/*
	@echo Copying to $(DATAPREPARE)
	@cp $(foreach dir,$(GFX16SRC),$(wildcard $(GFXROOT)/$(dir)/*.bin)) $(foreach dir,$(GFX08SRC),$(wildcard $(GFXROOT)/$(dir)/*.bin)) $(foreach dir,$(SOUNDSRC),$(wildcard $(dir)/*.bin)) $(DATAPREPARE)
	@touch binbuild

$(GFXROOT)/BigPinky/Bubbles/lastbuild : $(wildcard, $(GFXROOT)/BigPinky/Bubbles/*.png)
	cd $(GFXROOT)/BigPinky/Bubbles/  &&  alpha2ds -r -a
	@touch $(GFXROOT)/BigPinky/Bubbles/lastbuild

$(GFXROOT)/BigPinky/Kitzel/lastbuild : $(wildcard, $(GFXROOT)/BigPinky/Kitzel/*.png)
	cd $(GFXROOT)/BigPinky/Kitzel/  &&  alpha2ds -r 
	@touch $(GFXROOT)/BigPinky/Kitzel/lastbuild
	
$(GFXROOT)/BigPinky/Allgemein/lastbuild : $(wildcard, $(GFXROOT)/BigPinky/Allgemein/*.png)
	cd $(GFXROOT)/BigPinky/Allgemein/  &&  alpha2ds -r -a
	@touch $(GFXROOT)/BigPinky/Allgemein/lastbuild

$(GFXROOT)/LittlePinky/Walk/lastbuild : $(wildcard, $(GFXROOT)/LittlePinky/Walk/*.png)
	cd $(GFXROOT)/LittlePinky/Walk/  &&  alpha2ds -r -a
	@touch $(GFXROOT)/LittlePinky/Walk/lastbuild

$(GFXROOT)/Extras/Bubbles/lastbuild : $(wildcard, $(GFXROOT)/Extras/Bubbles/*.png)
	cd $(GFXROOT)/Extras/Bubbles/ && alpha2ds -r 
	@touch $(GFXROOT)/Extras/Bubbles/lastbuild
	
$(GFXROOT)/Extras/Menu/lastbuild : $(wildcard, $(GFXROOT)/Extras/Menu/*.png)
	cd $(GFXROOT)/Extras/Menu/  &&  alpha2ds -r 
	@touch $(GFXROOT)/Extras/Menu/lastbuild

$(GFXROOT)/Background/8BIT/lastbuild : $(wildcard, $(GFXROOT)/Background/8BIT/*.png)
	cd $(GFXROOT)/Background/8BIT/  &&  alpha2ds -r -8
	@touch $(GFXROOT)/Background/8BIT/lastbuild

$(GFXROOT)/Background/16BIT/lastbuild : $(wildcard, $(GFXROOT)/Background/16BIT/*.png)
	cd $(GFXROOT)/Background/16BIT/  &&  alpha2ds -r
	@touch $(GFXROOT)/Background/16BIT/lastbuild

$(GFXROOT)/LittlePinky/Common/lastbuild : $(wildcard, $(GFXROOT)/LittlePinky/Common/*.png)
	cd $(GFXROOT)/LittlePinky/Common/  &&  alpha2ds -r -8 -t -p littlepinky.pal.bin
	@touch $(GFXROOT)/LittlePinky/Common/lastbuild
	

#$(GFX16FILES) : $(PNG16FILES)
#	alpha2ds -r -f$@
#
#$(GFX08FILES) : %.png
#	alpha2ds -r -8 -f$@

clean:
	@echo clean ...
	@rm -fr $(BUILD) $(TARGET).elf $(TARGET).nds $(TARGET).arm9 $(TARGET).ds.gba 
 
run:
	wmb -data $(CURDIR)/$(TARGET).nds

#---------------------------------------------------------------------------------
else
 
DEPENDS	:=	$(OFILES:.o=.d)
 
#---------------------------------------------------------------------------------
# main targets
#---------------------------------------------------------------------------------
$(OUTPUT).nds	: 	$(OUTPUT).arm9
$(OUTPUT).arm9	:	$(OUTPUT).elf
$(OUTPUT).elf	:	$(OFILES)
 
%.gbfs.o : %.gbfs
	@$(bin2o)
	
#%.8.rle.bin : %.png
#	@$(alpha2ds -8 -r -f)	

#%.gbfs : $(wildcard ../$(DATA)/*.bin)
#	@cd ../$(DATA) && gbfs $@ $(GBFSFILES)
	 
#---------------------------------------------------------------------------------
#%.o	:	%.bin
#---------------------------------------------------------------------------------
#	@echo $(notdir $<)
#	$(bin2o)
 
 
-include $(DEPENDS)
 
#---------------------------------------------------------------------------------------
endif
#---------------------------------------------------------------------------------------
