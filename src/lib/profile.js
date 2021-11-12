import prisma from "~/lib/prisma";

export const getProfiles = (options = {}) => {
  const where = {};
  const { type, breed, disposition, availability } = options;

  if (type !== undefined) {
    where.breed = {
      type: {
        name: type,
      },
    };
  }
  if (breed !== undefined) {
    where.breed = {
      name: breed,
      ...where.breed,
    };
  }

  if (disposition != undefined) {
    where.disposition = {
      description: disposition,
    };
  }
  if (availability != undefined) {
    where.availability = {
      description: availability,
    };
  }
  return prisma.profile.findMany({
    where,
    select: {
      description: true,
      pic: true,
      breed: {
        select: {
          name: true,
          type: {
            select: {
              name: true,
            },
          },
        },
      },
      disposition: {
        select: {
          description: true,
        },
      },
      availability: {
        select: {
          description: true,
        },
      },
    },
  });
};

export const getAllProfilesDesc = () => {
  return prisma.profile.findMany({
    select: {
      description: true,
      pic: true,
      breed: {
        select: {
          name: true,
          type: {
            select: {
              name: true,
            },
          },
        },
      },
      disposition: {
        select: {
          description: true,
        },
      },
      availability: {
        select: {
          description: true,
        },
      },
    },
  });
};

export const getAllProfiles = () => {
  return prisma.profile.findMany({
    select: {
      description: true,
      pic: true,
      breed: {
        select: {
          name: true,
          type: {
            select: {
              name: true,
            },
          },
        },
      },
      disposition: {
        select: {
          description: true,
        },
      },
      availability: {
        select: {
          description: true,
        },
      },
    },
  });
};

export const getProfilesSearch = (type, breed, disposition, availability) => {
  var whereStatement = null;

  if (
    type != null &&
    breed != null &&
    disposition != null &&
    availability != null
  ) {
    whereStatement = {
      breed: {
        name: breed,
        type: {
          name: type,
        },
      },
      disposition: {
        description: disposition,
      },
      availability: {
        description: availability,
      },
    };
  } else if (
    type != null &&
    breed != null &&
    disposition != null &&
    availability == null
  ) {
    whereStatement = {
      breed: {
        name: breed,
        type: {
          name: type,
        },
      },
      disposition: {
        description: disposition,
      },
    };
  } else if (
    type != null &&
    breed != null &&
    disposition == null &&
    availability != null
  ) {
    whereStatement = {
      breed: {
        name: breed,
        type: {
          name: type,
        },
      },
      availability: {
        description: availability,
      },
    };
  } else if (
    type != null &&
    breed == null &&
    disposition != null &&
    availability != null
  ) {
    whereStatement = {
      breed: {
        type: {
          name: type,
        },
      },
      disposition: {
        description: disposition,
      },
      availability: {
        description: availability,
      },
    };
  } else if (
    type == null &&
    breed != null &&
    disposition != null &&
    availability != null
  ) {
    whereStatement = {
      breed: {
        name: breed,
      },
      disposition: {
        description: disposition,
      },
      availability: {
        description: availability,
      },
    };
  } else if (
    type != null &&
    breed != null &&
    disposition == null &&
    availability == null
  ) {
    whereStatement = {
      breed: {
        name: breed,
        type: {
          name: type,
        },
      },
    };
  } else if (
    type != null &&
    breed == null &&
    disposition != null &&
    availability == null
  ) {
    whereStatement = {
      breed: {
        type: {
          name: type,
        },
      },
      disposition: {
        description: disposition,
      },
    };
  } else if (
    type == null &&
    breed != null &&
    disposition != null &&
    availability == null
  ) {
    whereStatement = {
      breed: {
        name: breed,
      },
      disposition: {
        description: disposition,
      },
    };
  } else if (
    type != null &&
    breed == null &&
    disposition == null &&
    availability != null
  ) {
    whereStatement = {
      breed: {
        type: {
          name: type,
        },
      },
      availability: {
        description: availability,
      },
    };
  } else if (
    type == null &&
    breed != null &&
    disposition == null &&
    availability != null
  ) {
    whereStatement = {
      breed: {
        name: breed,
      },
      availability: {
        description: availability,
      },
    };
  } else if (
    type == null &&
    breed == null &&
    disposition != null &&
    availability != null
  ) {
    whereStatement = {
      disposition: {
        description: disposition,
      },
      availability: {
        description: availability,
      },
    };
  } else if (
    type != null &&
    breed == null &&
    disposition == null &&
    availability == null
  ) {
    whereStatement = {
      breed: {
        type: {
          name: type,
        },
      },
    };
  } else if (
    type == null &&
    breed != null &&
    disposition == null &&
    availability == null
  ) {
    whereStatement = {
      breed: {
        name: breed,
      },
    };
  } else if (
    type == null &&
    breed == null &&
    disposition != null &&
    availability == null
  ) {
    whereStatement = {
      disposition: {
        description: disposition,
      },
    };
  } else if (
    type == null &&
    breed == null &&
    disposition == null &&
    availability != null
  ) {
    whereStatement = {
      availability: {
        description: availability,
      },
    };
  }

  return prisma.profile.findMany({
    where: whereStatement,
    select: {
      description: true,
      pic: true,
      breed: {
        select: {
          name: true,
          type: {
            select: {
              name: true,
            },
          },
        },
      },
      disposition: {
        select: {
          description: true,
        },
      },
      availability: {
        select: {
          description: true,
        },
      },
    },
  });
};
