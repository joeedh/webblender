export var PropTypes = {
  INT        : 1,
  FLOAT      : 2,
  COLLECTION : 4,
  STRING : 8,
  BOOL   : 16,
  ENUM   : 32,
  FLAG   : 64
};

export var PropFlags = {
};

export class Property {
  constructor(type, flag=0, description="", name="") {
    this.type = type;
    this.subtype = 0;
    this.description = description == undefined ? "" : description;
    this.flag = flag != undefined ? flag : 0;
  }
  
  on_update(newdata, olddata) {
  }
  
  set_data(newdata, olddata) {
    this.on_update(newdata, olddata);
  }
}

export class IntProperty extends Property {
  constructor(flag=0, description="", name="") {
    super(PropTypes.INT, flag, description, name);
  }
  
  set_data(data) {
    var old_data = this.data;
    this.data = data;
    
    super.set_data(data, old_data);
  }
}

export class FloatProperty extends Property {
  constructor(flag=0, description="", name="") {
    super(PropTypes.FLOAT, flag, description, name);
  }
  
  set_data(data) {
    var old_data = this.data;
    this.data = data;
    
    super.set_data(data, old_data);
  }
}
