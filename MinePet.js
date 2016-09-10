/*
 * Mine Pet Script 1.1v
 * Team META #project 2
 *
 * @since 2016.8.1
 */
<<<<<<< HEAD
ModPE.setItem(500, "name_tag", 0, "Name Tag");
var myPet = null;

function makePet(entity) {
    this.entity = entity;
    this.name = "이름을 지어주세요!";
    Entity.setNameTag(this.entity, this.name);
    this.target = null;
    this.dmg = 5;
    this.speed = 50;
    this.mode = 0; //0 = walk, 1 = sit, 2 = ride
    this.uid = Entity.getUniqueId(entity);
    myPet = this;
}
makePet.prototype.setName = function(name) {
    this.name = name;
    Entity.setNameTag(this.entity, this.name);
};
makePet.prototype.setHealth = function(hp) {
    Entity.setHealth(this.entity, hp);
};
makePet.prototype.setTarget = function(entity) {
    this.target = entity;
};
makePet.prototype.move = fucntion() {
    Entity.push(this.entity, 70 * this.speed / 100);
};

function attackHook(a, v) {
    if (Player.getCarriedItem() == 500)
        makePet(v);
}

function modTick() {
    if (myPet !== null) {
        if (myPet.mode == 0) {
            Entity.setImmobile(myPet.entity, false);
            if (myPet.target !== null) { //if target is not set
                Entity.grab(myPet.entity, myPet.target, myPet.speed);
            } else { //if target is set
                Entity.grab(myPet.entity, myPet.target, myPet.speed); //following the target
                /** dmg the target **/
                if (Entity.getDst(myPet.target, myPet.entity) <= 2 && myPet.target !== null) {
                    Entity.grab(myPet.target, myPet.entity, myPet.speed); //push the target
                    Entity.dmg(myPet.target, -myPet.dmg); //damage the target
                }
            }
        }
        if (myPet.mode == 1) {
            Entity.setSneaking(myPet.entity, true);
            Entity.setImmobile(myPet.entity, false);
        }
        if (myPet.mode == 2) {
            Entity.setImmobile(myPet.entity, true);
            GUI.openMoveButton();
        } else {
            GUI.deleteMoveButton();
        }
    }
}

var AlertDialog = android.app.AlertDialog,
    DialogInterface = android.content.DialogInterface,
    Bitmap = android.graphics.Bitmap,
=======
const Bitmap = android.graphics.Bitmap,
>>>>>>> origin/master
    BitmapFactory = android.graphics.BitmapFactory,
    Canvas = android.graphics.Canvas,
    Color = android.graphics.Color,
    BitmapDrawable = android.graphics.drawable.BitmapDrawable,
    ColorDrawable = android.graphics.drawable.ColorDrawable,
    GradientDrawable = android.graphics.drawable.GradientDrawable,
    NinePatchDrawable = android.graphics.drawable.NinePatchDrawable,
    ShapeDrawable = android.graphics.drawable.ShapeDrawable,
    OvalShape = android.graphics.drawable.shapes.OvalShape,
    Paint = android.graphics.Paint,
    RadialGradient = android.graphics.RadialGradient,
    Rect = android.graphics.Rect,
    Shader = android.graphics.Shader,
    MediaPlayer = android.media.MediaPlayer,
    Environment = android.os.Environment,
    Gravity = android.view.Gravity,
    MotionEvent = android.view.MotionEvent,
    View = android.view.View,
    Button = android.widget.Button,
    CheckBox = android.widget.CheckBox,
    EditText = android.widget.EditText,
    FrameLayout = android.widget.FrameLayout,
    ImageView = android.widget.ImageView,
    LinearLayout = android.widget.LinearLayout,
    PopupWindow = android.widget.PopupWindow,
    ProgressBar = android.widget.ProgressBar,
    RelativeLayout = android.widget.RelativeLayout,
    ScrollView = android.widget.ScrollView,
    SeekBar = android.widget.SeekBar,
    Switch = android.widget.Switch,
    TextView = android.widget.TextView,
    ToggleButton = android.widget.ToggleButton,
    MainActivity = com.mojang.minecraftpe.MainActivity,
    File = java.io.File,
    FilenameFilter = java.io.FilenameFilter,
    FileOutputStream = java.io.FileOutputStream,
    Thread = java.lang.Thread,
    Runnable = java.lang.Runnable,
    ByteBuffer = java.nio.ByteBuffer,
    ByteOrder = java.nio.ByteOrder,
    Arrays = java.util.Arrays,
    ctx = MainActivity.currentMainActivity.get(),
    CENTER = Gravity.CENTER,
    LEFT = Gravity.LEFT,
    RIGHT = Gravity.RIGHT,
    TOP = Gravity.TOP,
    BOTTOM = Gravity.BOTTOM,
    BLACK = Color.BLACK,
    DKGRAY = Color.DKGRAY,
    GRAY = Color.GRAY,
    WHITE = Color.WHITE,
    DARK = Color.argb(250, 40, 40, 40),
    NONE = Color.TRANSPARENT,
    RED = Color.parseColor("#EF5350"),
    INDIGO = Color.parseColor("#5C6BC0"),
    BLUE = Color.parseColor("#42A5F5"),
    LIGHT_BLUE = Color.parseColor("#29B6F6"),
    CYAN = Color.parseColor("#26C6DA"),
    TEAL = Color.parseColor("#26A69A"),
    GREEN = Color.parseColor("#66BB6A"),
    LIGHT_GREEN = Color.parseColor("#9CCC65"),
    LIME = Color.parseColor("#D4E157"),
    YELLOW = Color.parseColor("#FFEE58"),
    AMBER = Color.parseColor("#FFCA28"),
    ORANGE = Color.parseColor("#FFA726"),
    DEEP_ORANGE = Color.parseColor("#FF7043"),
    BLUEGRAY = Color.parseColor("#78909C"),
    Visible = Color.argb(140, 40, 40, 40),
    PURPLE = Color.parseColor("#BA68C8"),
    DEEP_PURPLE = Color.parseColor("#7E57C2"),
    PINK = Color.parseColor("#F06292"),
<<<<<<< HEAD
    density = ctx.getResources()
    .getDisplayMetrics()
    .density;
dp = function(pixel) {
    return Math.ceil(pixel * density);
=======
    density = ctx.getResources().getDisplayMetrics().density;

let GUI = {},
    itemImageLoader = {},
    myPet = null,
    meal = [364];

let DATA = {
    speed: 50,
    dmg: 5,
    hp: null,
    knock: -100,
    name: "NONAME"
};

ModPE.setItem(700, "name_tag", 0, "Name Tag");

/**
 * AI Prototype
 * @author Adagio(magicwhos@gmail.com)
 * @since 2016.6.1
 * @version 1.1
 */

let mobArr = [],
    ai = {};

ai.death = function(v) {
    var number = mobArr.indexOf(v);
    if (number != -1) {
        mobArr[number].deathHook();
        mobArr[number].entity = null;
        mobArr.splice(number, 1);
    }
}
ai.tick = function() {
    var pe = Player.getEntity(),
        __A = null || function() {};
    Entity.action(mobArr, function(__F) {
        var __B = function() {} || null;
        (__F.entity !== null ? function() {
            __C = null || function() {};
            var __D = null || (__F.isAttacked ? __C : function() {
                Entity.setSaw(__F.entity, pe);
                __F.move()
                    .changeType()
                    .attack();
                __F.tick(__F);
            })();
            var __E = null || (__F.getHealth() < __F.hp ? function() {
                new java.lang.Thread({
                    run: function() {
                        __F.isAttacked = true;
                        __F.isAttackedHook(__F);
                        java.lang.Thread.sleep(__F.delay << 5 >> 5);
                        __F.isAttacked = false;
                    }
                }).start();
                __F.hp = null || __F.getHealth();
            } : __C)();
        } : __B)();
    } || __A);
}

function MakePet(entity) {
    this.entity = entity;
    this.maxHp = Entity.getMaxHealth(this.entity);
    this.hp = Entity.getHealth(this.entity);
    this.isAttacked = false;
    this.target = Player.getEntity();
    this.type = "NORMAL";
    this.delay = 500;
    this.damage = {
        NORMAL: -4,
        ATTACK: -6,
        AVOID: -2,
        COUNTER_ATTACK: -8
    };
    this.knockBack = {
        NORMAL: -100,
        ATTACK: -150,
        AVOID: -80,
        COUNTER_ATTACK: -200
    };
    this.speed = {
        NORMAL: 80,
        ATTACK: 100,
        AVOID: -20,
        COUNTER_ATTACK: 120
    };
    mobArr.push(this);
}

MakePet.prototype = {};
MakePet.prototype.setSkin = function(path) {
    Entity.setMobSkin(this.entity, path);
    return this;
};
MakePet.prototype.getEntity = function() {
    return this.entity;
};
MakePet.prototype.getType = function() {
    return this.type;
};
MakePet.prototype.setType = function(type) {
    this.type = type;
    return this;
};
MakePet.setRenderType = function(renderer) {
    Entity.setRenderType(this.entity, renderer);
    return this;
};
MakePet.prototype.getHealth = function() {
    return Entity.getHealth(this.entity);
};
MakePet.prototype.setHealth = function(n) {
    this.hp = n;
    Entity.setHealth(this.entity, n);
    return this;
};
MakePet.prototype.getMaxHealth = function(n) {
    return this.maxHp;
};
MakePet.prototype.setMaxHealth = function(n) {
    this.maxHp = n;
    Entity.setMaxHealth(this.entity, n);
    return this;
};
MakePet.prototype.setDamage = function(type, n) {
    if (type !== "ALL") this.damage[type] = n;
    else {
        for (var i in this.damage) this.damage[i] = n;
    }
    return this;
>>>>>>> origin/master
};
MakePet.prototype.setKnockBack = function(type, n) {
    if (type !== "ALL") this.knockBack[type] = n;
    else {
        for (var i in this.knockBack) this.knockBack[i] = n;
    }
    return this;
};
MakePet.prototype.setSpeed = function(type, n) {
    if (type !== "ALL") this.speed[type] = n;
    else {
        for (var i in this.speed) this.speed[i] = n;
    }
    return this;
};
MakePet.prototype.setTarget = function(ent) {
    this.target = ent;
    return this;
};
MakePet.prototype.getTarget = function(ent) {
    return this.target;
};
MakePet.prototype.move = function() {
    Entity.grab(this.entity, this.target, this.speed[this.type]);
    return this;
};
MakePet.prototype.setDelay = function(mSecond) {
    this.delay = mSecond;
    return this;
};
MakePet.prototype.getDelay = function() {
    return this.delay;
};
MakePet.prototype.attack = function() {
    if (Entity.getDst(this.target, this.entity) <= 2) {
        Entity.dmg(this.target, this.damage[this.type]);
        if (this.knockBack[this.type] !== null) {
            Entity.grab(this.target, this.entity, this.knockBack[this.type]);
        }
        this.attackHook(this, this.target);
    }
    return this;
};
MakePet.prototype.changeType = function() {
    var hp = this.getHealth();
    if (hp >= this.maxHp) this.type = "COUNTER_ATTACK";
    else if (hp >= this.maxHp / 4 * 3) this.type = "NORMAL";
    else if (hp >= this.maxHp / 4 * 2) this.type = "ATTACK";
    else if (hp >= this.maxHp / 4 * 1) this.type = "AVOID";
    else if (hp < this.maxHp / 4) this.type = "COUNTER_ATTACK";
    return this;
};
MakePet.prototype.tick = function(ai) {};
MakePet.prototype.attackHook = function(ai, victim) {
    if (Entity.getHealth(victim) <= 0) {
        ai.setDamage("ALL", 0)
          .setKnockBack("ALL", null)
          .setTarget(Player.getEntity());
    }
};
MakePet.prototype.isAttackedHook = function(ai) {};
MakePet.prototype.deathHook = function(ai) {};

function deathHook(a, v) {
    ai.death(v);
}

function dp(pixel) {
    return Math.ceil(pixel * density);
}

function attackHook(a, v) {
    if (Player.getCarriedItem() == 700) {
        preventDefault();
        myPet = new MakePet(v)
            .setDamage("ALL", 0)
            .setKnockBack("ALL", null)
            .setSpeed("ALL", DATA.speed)
            .setMaxHealth(20)
            .setHealth(20)
            .setTarget(Player.getEntity());
        print("펫으로 설정했습니다.");
    } else {
        myPet.setDamage("ALL", DATA.dmg)
            .setKnockBack("ALL", DATA.knock)
            .setTarget(v);
    }
}

function modTick() {
    ai.tick();
}

function newLevel() {
    GUI.open();
    Player.addItemCreativeInv(700, 2, 0);
}

/**
 * GUI
 * @since 2016.08.05
 */
(GUI => {
    "use strict";

    GUI.sheet = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png"));
    GUI.touchGUI = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png"));
    GUI.touchGUI2 = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/touchgui2.png"));
    GUI.createNinePatch = (bitmap, x, y, xx, yy) => {
        var NO_COLOR = 0x00000001;
        var buffer = java.nio.ByteBuffer.allocate(84).order(java.nio.ByteOrder.nativeOrder());
        buffer.put(0x01);
        buffer.put(0x02);
        buffer.put(0x02);
        buffer.put(0x09);
        for (var i = 0; i < 7; i++) buffer.putInt(0);
        buffer.putInt(y);
        buffer.putInt(yy);
        buffer.putInt(x);
        buffer.putInt(xx);
        for (var i = 0; i < 9; i++) buffer.putInt(NO_COLOR)
        var drawable = new NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), null);
        return drawable;
    };
    GUI.buttonNormal = function() {
        var bitmap = Bitmap.createBitmap(GUI.sheet, 8, 32, 8, 8);
        var bit = Bitmap.createScaledBitmap(GUI.bitmap, dp(16), dp(16), false);
        return GUI.createNinePatch(bit, dp(4), dp(4), dp(12), dp(14));
    };
    GUI.buttonPress = function() {
        var bitmap = Bitmap.createBitmap(GUI.sheet, 0, 32, 8, 8);
        var bit = Bitmap.createScaledBitmap(GUI.bitmap, dp(16), dp(16), false);
        return GUI.createNinePatch(bit, dp(4), dp(4), dp(12), dp(14));
    };
    GUI.window = function() {
        var bitmap = Bitmap.createBitmap(GUI.sheet, 1, 1, 14, 14);
        bitmap.setPixel(0, 0, 0x00000001);
        bitmap.setPixel(13, 13, 0x00000001);
        bitmap.setPixel(0, 13, 0x00000001);
        bitmap.setPixel(13, 0, 0x00000001);
        var bit = Bitmap.createScaledBitmap(bitmap, dp(32), dp(32), false);
        return GUI.createNinePatch(bit, dp(8), dp(8), dp(16), dp(16));
    };
    GUI.ctx = ctx;
    GUI.isOpen = false;
    GUI.isMove = false;
    GUI.mainWindow = null;
    GUI.moveButtonWindow = null;
    GUI.width = ctx.getWindowManager()
        .getDefaultDisplay()
        .getWidth();
    GUI.height = ctx.getWindowManager()
        .getDefaultDisplay()
        .getHeight();

    /**
     * newLevel함수에 호출되는 메인 버튼을 생성합니다.
     * @since 2016.08.05
     */
<<<<<<< HEAD
    GUI.open = () => {
        GUI.runOnUiThread(ctx, function() {
            var mainButton = new Button(ctx);
            var mainLayout = new RelativeLayout(ctx);
            GUI.onClick(mainButton, fucntion() {
=======
    GUI.open = function() {
        GUI.runOnUiThread(ctx, function() {
            var mainButton = new Button(ctx);
            var mainLayout = new RelativeLayout(ctx);
            GUI.onClick(mainButton, function() {
>>>>>>> origin/master
                GUI.openMenu();
            });
            GUI.setClickEffect(mainButton);
            mainLayout.addView(mainButton);
            GUI.mainWindow = new PopupWindow(mainLayout, dp(48), dp(48), false);
            GUI.mainWindow.showAtLocation(ctx.getWindow()
                .getDecorView(), RIGHT | BOTTOM, 0, 0);
        });
    };

    /**
     * newLevel함수에 호출되는 메인 버튼을 제거합니다.
     * @since 2016.08.05
     */
<<<<<<< HEAD
    GUI.close = () => {
        GUI.runOnUiThread(ctx, function() {
            if (GUI.mainWindow !== null) GUI.mainWindow.dismiss();
=======
    GUI.close = function() {
        GUI.runOnUiThread(ctx, function() {
            if (GUI.mainWindow !== null) {
                GUI.mainWindow.dismiss();
            }
>>>>>>> origin/master
            GUI.mainWindow = null;
        });
    };

    /**
     * open버튼을 클릭할시 생성되는 메인 메뉴를 생성합니다.
     * @since 2016.08.05
     */
<<<<<<< HEAD
    GUI.openMenu = () => {
        if (myPet != null) {
            GUI.runOnUiThread(ctx, function() {
=======
    GUI.openMenu = function() {
        GUI.runOnUiThread(ctx, function() {
            if (myPet !== null) {
>>>>>>> origin/master
                var layout = new LinearLayout(ctx);
                layout.setOrientation(1);
                layout.setPadding(dp(8), dp(8), dp(8), dp(8));

                var title = new TextView(ctx);
                title.setText("Mine Pet");
                title.setGravity(LEFT);
                title.setTextColor(YELLOW);
                title.setTextSize(24);
                title.setShadowLayer(1, dp(2), dp(2), Color.argb(255, 44, 44, 44));
                layout.addView(title);

                layout.addView(GUI.widget.line(2, WHITE));
                layout.addView(GUI.widget.space());

                var healthButton = new Button(ctx);
                healthButton.setText("체력": Entity.getHealth(myPet.entity));
                healthButton.setTextColor(WHITE);
                healthButton.setId(0);
<<<<<<< HEAD
=======
                GUI.setClickEffect(healthButton);
>>>>>>> origin/master
                GUI.onClick(healthButton, function(v) {
                    GUI.openOption(v.getId());
                });
                layout.addView(healthButton);

                layout.addView(GUI.widget.space());

                var speedButton = new Button(ctx);
                speedButton.setText("속력");
                speedButton.setTextColor(WHITE);
                speedButton.setId(1);
<<<<<<< HEAD
=======
                GUI.setClickEffect(speedButton);
>>>>>>> origin/master
                GUI.onClick(speedButton, function(v) {
                    GUI.openOption(v.getId());
                });
                layout.addView(speedButton);

                layout.addView(GUI.widget.space());

<<<<<<< HEAD
                var speedButton = new Button(ctx);
                speedButton.setText("공격력");
                speedButton.setTextColor(WHITE);
                speedButton.setId(2);
                GUI.onClick(speedButton, function(v) {
=======
                var dmgButton = new Button(ctx);
                dmgButton.setText("공격력");
                dmgButton.setTextColor(WHITE);
                dmgButton.setId(2);
                GUI.setClickEffect(dmgButton);
                GUI.onClick(dmgButton, function(v) {
>>>>>>> origin/master
                    GUI.openOption(v.getId());
                });
                layout.addView(dmgButton);

                layout.addView(GUI.widget.space());

                var modeButton = new Button(ctx);
                modeButton.setText((myPet.mode == 0 ? "걷기" : "앉기"));
                modeButton.setTextColor(WHITE);
<<<<<<< HEAD
=======
                GUI.setClickEffect(modeButton);
>>>>>>> origin/master
                GUI.onClick(modeButton, function(v) {
                    myPet.mode++;
                    if (myPet.mode == 3) myPet.mode = 0;
                    if (myPet.mode == 0) v.setText("걷기");
                    if (myPet.mode == 1) v.setText("앉기");
                    if (myPet.mode == 2) {
                        v.setText("타기");
                        Entity.rideAnimal(Player.getEntity(), myPet.entity);
                    } else {
                        var ent = Level.spawnMob(Player.getX(), Player.getY(), Player.getZ(), 81);
                        Entity.rideAnimal(Player.getEntity(), ent);
                        Entity.remove(ent);
                    }
                });
                layout.addView(modeButton);

                layout.addView(GUI.widget.space());
                layout.addView(GUI.widget.line(2, WHITE));
                layout.addView(GUI.widget.space());

                var settingButton = new Button(ctx);
                settingButton.setText("설정");
                settingButton.setTextColor(WHITE);
                settingButton.setId(3);
<<<<<<< HEAD
=======
                GUI.setClickEffect(settingButton);
>>>>>>> origin/master
                GUI.onClick(settingButton, function(v) {

                });
                layout.addView(settingButton);

                GUI.menuWindow = new PopupWindow(layout, GUI.width / 3, GUI.height, true);
                GUI.menuWindow.setBackgroundDrawable(GUI.window());
                GUI.menuWindow.showAtLocation(ctx.getWindow()
                    .getDecorView(), RIGHT | BOTTOM, 0, 0);
<<<<<<< HEAD
            });
        } else {
            print("이름표로 엔티티를 터치하여 펫으로 만들어주세요!");
        }
=======

            } else {
                print("펫이 존재하지 않습니다.");
            }
        });
>>>>>>> origin/master
    };

    /**
     * open버튼을 클릭할시 생성되는 메인 메뉴를 제거합니다.
     * @since 2016.08.05
     */
<<<<<<< HEAD
    GUI.closeMenu = () => {
        GUI.runOnUiThread(ctx, function() {
            if (GUI.menuWindow !== null) GUI.menuWindow.dismiss();
=======
    GUI.closeMenu = function() {
        GUI.runOnUiThread(ctx, function() {
            if (GUI.menuWindow !== null) {
                GUI.menuWindow.dismiss();
            }
>>>>>>> origin/master
            GUI.menuWindow = null;
        });
    };

    /**
     * 버튼에 따라 여러가지 옵션창을 생성합니다.
     * @since 2016.08.05
     */
<<<<<<< HEAD
    GUI.openOption = (id) => {
=======
    GUI.openOption = function(id) {
>>>>>>> origin/master
        switch (id) {
            case 0:
                GUI.openHealth();
                break;
            case 1:
                GUI.openSpeed();
                break;
            case 2:
                GUI.openDamage();
                break;
        }
    };

    /**
    * 일정한 텍스트를 반복하여 반환합니다
    * @param {String} text 반복할 문자
    * @param {Number} n 반복할 횟수
    */
    GUI.getMultiText = (text, n) => {
      let str = "";
      for(var i = 0; i < n; i++) str += text;
      return str;
    };

    /**
     * myPet의 체력을 수정할 수 있는 창을 생성합니다.
     * @since 2016.08.05
     */
<<<<<<< HEAD
    GUI.openHealth = () => {
=======
    GUI.openHealth = function() {
>>>>>>> origin/master
        GUI.runOnUiThread(ctx, function() {
            var layout = new LinearLayout(ctx);
            layout.setOrientation(1);
            layout.setPadding(dp(8), dp(8), dp(8), dp(8));

            var title = new TextView(ctx);
            title.setText("Health");
            title.setGravity(LEFT);
            title.setTextColor(YELLOW);
            title.setTextSize(24);
            title.setShadowLayer(1, dp(2), dp(2), Color.argb(255, 44, 44, 44));
            layout.addView(title);

            layout.addView(GUI.widget.line(2, WHITE));
            layout.addView(GUI.widget.space());

            var healthView = new TextView(ctx);
            healthView.setGravity(CENTER);
            healthView.setTextColor(RED);
            healthView.setTextSize(16);
<<<<<<< HEAD
            healthView.setText(GUI.getMultiText("0", Entity.getHealth(myPet.entity)));
=======
            healthView.setText(getHeart(Entity.getHealth(myPet.entity)));
            layout.addView(healthView);
>>>>>>> origin/master

            var button = new ImageView(ctx);
            button.setImageBitmap(itemImageLoader.getImage(364, 0));
            GUI.setClickEffect(button);
            GUI.onClick(button, function() {
                let meal = [364];
                for (var i = 0; i < 55; i++) {
                    var slot = Player.getInventorySlot(i);
                    if (meal.indexOf(slot) != -1) {
                        Entity.dmg(myPet.entity, 4);
                        for(var i = 0; i < 4; i++) {
                          Entity.particle.add(myPet.entity, 0, 0, 0, ParticleType.hear, 4);
                        }
                        Player.setInventorySlot(i, slot, Player.getInventorySlotCount(i) - 1, Player.getInventorySlotData(i));
                        break;
                    }
                }
                print("먹이가 없습니다.");
            });
            layout.addView(button);

            var window = new PopupWindow(layout, GUI.width / 3, GUI.height / 3, true);
            window.setBackgroundDrawable(GUI.window());
            window.showAtLocation(ctx.getWindow()
                .getDecorView(), RIGHT | BOTTOM, GUI.width / 3, GUI.height / 3);
        });
    };

    /**
     * myPet의 속력을 수정할 수 있는 창을 생성합니다.
     * @since 2016.08.05
     */
<<<<<<< HEAD
    GUI.openSpeed = () => {
=======
    GUI.openSpeed = function() {
>>>>>>> origin/master
        GUI.runOnUiThread(ctx, function() {
            var layout = new LinearLayout(ctx);
            layout.setOrientation(1);
            layout.setPadding(dp(8), dp(8), dp(8), dp(8));

            var title = new TextView(ctx);
            title.setText("speed");
            title.setGravity(LEFT);
            title.setTextColor(YELLOW);
            title.setTextSize(24);
            title.setShadowLayer(1, dp(2), dp(2), Color.argb(255, 44, 44, 44));
            layout.addView(title);

            layout.addView(GUI.widget.line(2, WHITE));
            layout.addView(GUI.widget.space());

            var speedView = new TextView(ctx);
            speedView.setGravity(CENTER);
            speedView.setTextColor(RED);
            speedView.setTextSize(16);
<<<<<<< HEAD
            speedView.setText(GUI.getMultiText("1" ,myPet.speed));
=======
            speedView.setText(getSpeed(myPet.speed));
            layout.addView(speedView);
>>>>>>> origin/master

            var button = new ImageView(ctx);
            button.setImageBitmap(itemImageLoader.getImage(364, 0));
            GUI.setClickEffect(button);
            GUI.onClick(button, function() {
                let meal = [364];
                for (var i = 0; i < 55; i++) {
                    var slot = Player.getInventorySlot(i);
                    if (meal.indexOf(slot) != -1) {
                        myPet.speed += 2;
                        for(var i = 0; i < 4; i++) {
                          Entity.particle.add(myPet.entity, 0, 0, 0, ParticleType.splash, 4);
                        }
                        Player.setInventorySlot(i, slot, Player.getInventorySlotCount(i) - 1, Player.getInventorySlotData(i));
                        break;
                    }
                }
                print("먹이가 없습니다.");
            });
            layout.addView(button);

            var window = new PopupWindow(layout, GUI.width / 3, GUI.height / 3, true);
            window.setBackgroundDrawable(GUI.window());
            window.showAtLocation(ctx.getWindow()
                .getDecorView(), RIGHT | BOTTOM, GUI.width / 3, GUI.height / 3);
        });
    };

    /**
     * myPet의 공격력을 수정할 수 있는 창을 생성합니다.
     * @since 2016.08.05
     */
<<<<<<< HEAD
    GUI.openDamage = () => {
=======
    GUI.openDamage = function() {
>>>>>>> origin/master
        GUI.runOnUiThread(ctx, function() {
            var layout = new LinearLayout(ctx);
            layout.setOrientation(1);
            layout.setPadding(dp(8), dp(8), dp(8), dp(8));

            var title = new TextView(ctx);
            title.setText("Damage");
            title.setGravity(LEFT);
            title.setTextColor(YELLOW);
            title.setTextSize(24);
            title.setShadowLayer(1, dp(2), dp(2), Color.argb(255, 44, 44, 44));
            layout.addView(title);

            layout.addView(GUI.widget.line(2, WHITE));
            layout.addView(GUI.widget.space());

<<<<<<< HEAD
            var damageView = new TextView(ctx);
            damageView.setGravity(CENTER);
            damageView.setTextColor(RED);
            damageView.setTextSize(16);
            damageView.setText(GUI.getMultiText("2", myPet.dmg));
=======
            var healthView = new TextView(ctx);
            healthView.setGravity(CENTER);
            healthView.setTextColor(RED);
            healthView.setTextSize(16);
            layout.addView(healthView);
>>>>>>> origin/master

            var button = new Button(ctx);
            button.setImageBitmap(itemImageLoader.getImage(364, 0));
            GUI.setClickEffect(button);
            GUI.onClick(button, function() {
                for (var i = 0; i < 55; i++) {
                    var slot = Player.getInventorySlot(i);
<<<<<<< HEAD
                    if (meal.indexOf(slot) != -1) {
                        myPet.dmg ++;
=======
                    if (meal.indexOf(slot) !== -1) {
                        Entity.dmg(myPet.entity, 4);
>>>>>>> origin/master
                        Player.setInventorySlot(i, slot, Player.getInventorySlotCount(i) - 1, Player.getInventorySlotData(i));
                        break;
                    }
                }
            });
            layout.addView(button);

            var window = new PopupWindow(layout, GUI.width / 3, GUI.height / 3, true);
            window.setBackgroundDrawable(GUI.window());
            window.showAtLocation(ctx.getWindow()
                .getDecorView(), RIGHT | BOTTOM, GUI.width / 3, GUI.height / 3);
        });
    };

    /**
     * myPet을 움직일수 있게 만드는 버튼을 생성합니다.
     * @since 2016.08.05
     */
<<<<<<< HEAD
    GUI.openMoveButton = () => {
        if (GUI.isMove == false) {
=======
    GUI.openMoveButton = function() {
        if (!GUI.isMove) {
>>>>>>> origin/master
            GUI.runOnUiThread(ctx, function() {
                var layout = new RelativeLayout(ctx);
                var button = new Button(ctx);
                GUI.setClickEffect(button);
                GUI.onClick(button, function(v) {
                    myPet.move();
                });

                GUI.moveButtonWindow = new PopupWindow(layout, dp(48), dp(48), true);
                GUI.moveButtonWindow.showAtLocation(ctx.getWindow()
                    .getDecorView(), RIGHT | BOTTOM, 0, dp(50));
            });
            GUI.isMove = true;
        }
    };

    /**
     * myPet을 움직일수 있게 만드는 버튼을 제거합니다.
     * @since 2016.08.07
     */
<<<<<<< HEAD
    GUI.openMoveButton = () => {
        if (GUI.isMove == true) {
            GUI.runOnUiThread(ctx, function() {
                if (GUI.moveButtonWindow !== null) GUI.moveButtonWindow.dismiss();
=======
    GUI.openMoveButton = function() {
        if (GUI.isMove) {
            GUI.runOnUiThread(ctx, function() {
                if (GUI.moveButtonWindow !== null) {
                    GUI.moveButtonWindow.dismiss();
                }
>>>>>>> origin/master
                GUI.moveButtonWindow = null;
            });
            GUI.isMove = false;
        }
    };

    /**
     * Activity의 UiThread를 실행합니다.
     * @since 2016.08.05
     * @param {Context} ctx Activity
     * @param {Function} content 실행할 함수
     */
<<<<<<< HEAD
    GUI.runOnUiThread = (ctx, content) => {
=======
    GUI.runOnUiThread = function(ctx, content) {
>>>>>>> origin/master
        ctx.runOnUiThread(new Runnable({
            run: function() {
                try {
                    content();
                } catch (error) {
                    clientMessage(ChatColor.DARK_RED + "[ERROR : " + err + ", LINE: " + err.lineNumber + "]");
                }
            }
        }));
    };

    /**
     * 버튼에 마인크래프트 형식의 클릭효과를 부여합니다.
     * @since 2016.08.05
     * @param {Widget} view 해당위젯
     */
<<<<<<< HEAD
    GUI.setClickEffect = (view) => {
        GUI.runOnUiThread(ctx, function() {
            view.setClickable(true);
            view.setBackgroundDrawable(GUI.buttonNormal());
            GUI.onTouch(view, function(v) {
                view.setBackgroundDrawable(GUI.buttonPress());
            }, function() {
                view.setBackgroundDrawable(GUI.buttonNormal());
            });
        });
    };

    /**
     * 버튼클릭시
     * @since 2016.08.05
     * @param {Widget} view 해당위젯
     * @param {Function} content 실행함수
     */
    GUI.onClick = (view, content) => {
        GUI.runOnUiThread(this.ctx, function() {
            view.setClickable(true);
            view.setOnClickListener(new View.OnClickListener({
                onClick: function(v) {
                    if (content != null) content(v);
=======
    GUI.setClickEffect = function(view) {
        GUI.runOnUiThread(ctx, function() {
            view.setBackgroundDrawable(GUI.buttonNormal());
            view.setOnTouchListener(new View.OnTouchListener({
                onTouch: function(v, event) {
                    switch (event.action) {
                        case android.view.MotionEvent.ACTION_DOWN: //버튼에 손 댔을 때
                            view.setBackgroundDrawable(GUI.buttonPress());
                            break;

                        case android.view.MotionEvent.ACTION_UP: //버튼에서 손 땟을때
                            view.setBackgroundDrawable(GUI.buttonNormal());
                            break;
                    }
                    return false;
                }
            }));
        });
    };

    GUI.onClick = function(view, content) {
        GUI.runOnUiThread(ctx, function() {
            view.setOnClickListener(new View.OnClickListener({
                onClick: function(v) {
                    if (content !== null) {
                        content(v);
                    }
>>>>>>> origin/master
                }
            }));
        });
    };

<<<<<<< HEAD
    /**
     * 버튼을 길게 누를시
     * @since 2016.08.05
     * @param {Widget} view 해당위젯
     * @param {Function} content 실행함수
     */
    GUI.onLongClick = (view, content) => {
        GUI.runOnUiThread(this.ctx, function() {
            view.setClickable(true);
            view.setOnLongClickListener(new View.OnLongClickListener({
                onLongClick: function() {
                    if (content != null) content();
=======
    GUI.onLongClick = function(view, content) {
        GUI.runOnUiThread(ctx, function() {
            view.setOnLongClickListener(new View.OnLongClickListener({
                onLongClick: function() {
                    if (content !== null) {
                        content();
                    }
>>>>>>> origin/master
                    return true;
                }
            }));
        });
    };
<<<<<<< HEAD

    /**
     * 버튼을 터치할시
     * @since 2016.08.05
     * @param {Widget} view 해당위젯
     * @param {Function} func 버튼에 손댔을때 실행함수
     * @param {Function} func2 버튼에 손땠을때 실행함수
     * @param {Function} func3 버튼에 손을 대고있을때
     */
    GUI.onTouch = (view, func, func2, func3) => {
        GUI.runOnUiThread(this.ctx, function() {
            view.setClickable(true);
            view.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch: function(v, event) {
                    switch (event.action) {
                        case android.view.MotionEvent.ACTION_DOWN: //버튼에 손 댔을 때
                            if (func !== null) func();
                            break;

                        case android.view.MotionEvent.ACTION_UP: //버튼에서 손 땟을때
                            if (func2 !== null) func2();
                            break;

                        case android.view.MotionEvent.ACTION_MOVE:
                            if (func3 != null) func3();
=======

    GUI.onTouch = function(view, func, func2, func3) {
        GUI.runOnUiThread(ctx, function() {
            view.setOnTouchListener(new View.OnTouchListener({
                onTouch: function(v, event) {
                    switch (event.action) {
                        case android.view.MotionEvent.ACTION_DOWN: //버튼에 손 댔을 때
                            if (func !== null) {
                                func(v);
                            }
                            break;

                        case android.view.MotionEvent.ACTION_UP: //버튼에서 손 땟을때
                            if (func2 !== null) {
                                func2(v);
                            }
                            break;

                        case android.view.MotionEvent.ACTION_MOVE:
                            if (func3 !== null) {
                                func3(v);
                            }
>>>>>>> origin/master
                            break;
                    }
                    return false;
                }
            }));
        });
    };
})(GUI);

(widget => {
    "use strict";

    /**
     * 뛰어쓰기용 위젯을 반환합니다.
     * @since 2016.08.05
     */
    widget.space = function() => {
        var text = new TextView(ctx);
        text.setText("");
        text.setTextSize(2);
        return text;
    };

    /**
     * Line 위젯을 반환합니다.
     * @since 2016.08.05
     * @param {Number} size 크기
     * @param {Color} color 색
     */
    widget.line = (size, color) => {
        var line = new TextView(ctx);
        line.setText("");
        line.setTextSize(size);
        line.setBackgroundDrawable(new ColorDrawable(color));
        return line;
    };
})(GUI.widget || (GUI.widget = {}));

/**
 * @file itemImageLoader
 * @author Adagio <magicwho@naver.com>
 * @since 2016-08-21
 * @version 1.0
 */

/**
 * @namespace itemImageLoader
 */
(itemImageLoader => {
	"use strict";

	itemImageLoader.uvs = eval(new java.lang.String(ModPE.getBytesFromTexturePack("images/items.meta")) + "");
	itemImageLoader.sheet = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/items-opaque.png"));

	/**
	 * 아이템 코드를 아이템 이름으로 변경
	 * @param {Number} itemCode 아이템코드
	 */
	itemImageLoader.item2name = (itemCode) => {
		return net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetItemName(number, 0, false);
	}

	/**
	 * 아이템비트맵을 반환합니다.
	 * @param {Number} element 아이템 이름
	 * @param {Number} type 아이템 타입
	 */
	itemImageLoader.makeBitmap = (name, type) => {
		for(var i = 0, max = this.uvs.length; i < max; i++) {
			var obj = this.uvs[i];
			if(obj.name === name) {
				return Bitmap.createBitmap(this.sheet, obj.uvs[type][0], obj.uvs[type][1], 16, 16);
			}
		}
	};

	/**
	 * 아이템비트맵을 반환합니다.
	 * @param {Number} element 아이템 이름 or 아이템 코드
	 * @param {Number} type 아이템 타입
	 */
	itemImageLoader.getImage = (element, type) => {
		if(typeof element === "string") itemImageLoader.makeBitmap(element, type);
		if(typeof element === "number") itemImageLoader.makeBitmap(itemImageLoader.item2name(element), type);
	}
})(itemImageLoader);

/**
 * @file
 * <h3>Change Log</h3>
 * <ol>
 *     <li>Fixed jsdoc tags.</li>
 *     <li>Fixed methods</li>
 *     <li>Faster source.</li>
 *     <li>New methods
 *         <ul>
 *             <li>Entity.getPointedBlock(x, y, z);</li>
 *             <li>Entity.getEntityInArea(x, y, z, x2, y2, z2);</li>
 *             <li>Entity.getFilterEntity(arr, () => { return Entity.getHealth(ent) > 10; });</li>
 *             <li>Level.rnd2Number(-5, 5);</li>
 *         </ul>
 *     </li>
 * </ol>
 * @author Adagio <magicwho@naver.com>
 * @since 2016-05-02
 * @version 2.0
 */

/**
 * @namespace Entity
 */
(Entity => {
    "use strict";

    /**
     * Entity에게 함수를 실행합니다.
     * @since 2016-05-02
     * @param {Array.<Object>} arr 실행할 Entity
     * @param {Function} func 실행할 함수
     */
    Entity.action = (arr, func) => {
        for (let i = arr.length; i--;) {
            let entity = arr[i];
            if (entity !== null) {
                func(entity, i);
            }
        }
    };

    /**
     * attacker이 victim의 등을 타격유무를 반환합니다.
     * @since 2016-05-28
     * @param {Object} attacker
     * @param {Object} victim
     * @returns {} attacker이 victim의 등을 타격유무
     */
    Entity.attackedBack = (attacker, victim) => {
        let yaw = Entity.getYaw(attacker) % 360,
            yaw2 = Entity.getYaw(victim) % 360,
            pitch = Entity.getPitch(attacker),
            pitch2 = Entity.getPitch(victim);
        if (yaw <= yaw2 + 80 && yaw >= yaw2 - 80) {
            if (pitch <= pitch2 + 40 && pitch >= pitch2 - 40) {
                return true;
            }
        }
        return false;
    };

    /**
     * Entity에게 지정한 데미지를 줍니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @param {Number} damage 데미지
     */
    Entity.dmg = (entity, damage) => {
        if (Entity.getHealth(entity) > damage)
            Entity.setHealth(entity, Entity.getHealth(entity) + damage);
        else {
            Entity.addEffect(myPet.target, MobEffect.harm, 1, 100000, true, false);
        }
    };

    /**
     * Entity를 폭발시킵니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @param {Number} power 폭발 강도
     * @returns {Object} Entity
     */
    Entity.explode = (entity, power) => {
        Level.explode(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity), power);
        return entity;
    };

    /**
     * 모든 몹을 가져옵니다.
     * @since 2016-05-02
     * @returns {Array.<Object>} 모든 몹 Entity
     */
    Entity.getAllMob = () => {
        return Entity.getAll().filter(entity => {
            let typeId = Entity.getEntityTypeId(entity);
            return typeId > 0 && typeId < 61 && entity !== null;
        });
    };

    /**
     * Entity와 Entity2의 사이의 거리를 반환합니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @param {Object} entity2 Entity2
     * @returns {Number} Entity와 Entity2의 사이의 거리
     */
    Entity.getDst = (entity, entity2) => {
        return Math.hypot(Entity.getX(entity) - Entity.getX(entity2), Entity.getY(entity) - Entity.getY(entity2), Entity.getZ(entity) - Entity.getZ(entity2));
    };

    /**
     * 범위 안에 있는 몹을 모두 반환합니다.
     * @since 2016-05-02
     * @param {Number} sx Standard coord X
     * @param {Number} sy Standard coord Y
     * @param {Number} sz Standard coord Z
     * @param {Number} ex Object coord X
     * @param {Number} ey Object coord Y
     * @param {Number} ez Object coord Z
     * @returns {Array.<Object>} 범위 안에 있는 몹
     */
    Entity.getEntityInArea = (sx, sy, sz, ex, ey, ez) => {
        return Entity.getAllMob().filter(entity => {
            let x = Entity.getX(entity),
                y = Entity.getY(entity),
                z = Entity.getZ(entity);
            return x <= Math.max(sx, ex) && x >= Math.min(sx, ex) && y <= Math.max(sy, ey) && y >= Math.min(sy, ey) && z <= Math.max(sz, ez) && z >= Math.min(sz, ez);
        });
    };

    /**
     * Entity를 필터링합니다.
     * @since 2016-05-02
     * @param {Array.<Object>} arr 필터링할 Entity
     * @param {Function} func 필터링 조건
     * @returns {Array.<Object>} 반환되는 Entity
     */
    Entity.getFilterEntity = (arr, func) => {
        return arr.filter(entity => {
            return func(entity);
        });
    };

    /**
     * 지정한 Entity를 기준으로 지정한 거리 안에 있는 몹을 반환합니다.
     * @since 2016-05-02
     * @param {Object} entity 지정한 Entity
     * @param {Number} distance 지정한 거리
     * @returns {Array.<Object>} 지정한 거리 안의 모든 몹 Entity
     */
    Entity.getNearByEntity = (entity, distance) => {
        return Entity.getAllMob().filter(i => {
            return Entity.getDst(entity, i) <= distance;
        });
    };

    /**
     * 지정한 Entity를 기준으로 지정한 거리 안에 있는 가장 가까운 몹을 반환합니다.
     * @since 2016-05-02
     * @param {Object} entity 지정한 Entity
     * @param {?Number} [distance=null] 지정한 거리
     * @returns {Object} 지정한 거리 안의 가장 가까운 몹 Entity
     */
    Entity.getNearestEntity = (entity, distance) => {
        let arr;
        if (distance === null) {
            arr = Entity.getAllMob();
        } else {
            arr = Entity.getNearByEntity(entity, distance);
        }
        return arr.sort((target, target2) => {
            return Entity.getDst(target, entity) - Entity.getDst(target2, entity);
        })[0];
    };

    /**
     * Entity가 바라보는 Entity를 반환합니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @returns {Object} 바라보는 Entity
     */
    Entity.getPointedEntity = entity => {
        let x = Entity.getPointedX(entity),
            y = Entity.getPointedY(entity),
            z = Entity.getPointedZ(entity),
            arr = Entity.getAll();
        for (let i = arr.length; i--;) {
            let entity_ = arr[i];
            if (x === Math.floor(Entity.getX(entity_)) && y === Math.floor(Entity.getY(entity_)) && z === Math.floor(Entity.getZ(entity_))) {
                return arr[i];
            }
        }
    };

    /**
     * Entity가 바라보는 X좌표를 반환합니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @returns {Number} Entity가 바라보는 X좌표
     */
    Entity.getPointedBlockX = entity => {
        let radian = Math.PI / 180;
        return Math.floor(Entity.getX(entity) + 2 * -Math.sin(Entity.getYaw(entity) * radian) * Math.cos(Entity.getPitch(entity) * radian));
    };

    /**
     * Entity가 바라보는 Y좌표를 반환합니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @returns {Number} Entity가 바라보는 Y좌표
     */
    Entity.getPointedBlockY = entity => {
        let radian = Math.PI / 180;
        return Math.floor(Entity.getY(entity) + 2 * -Math.sin(Entity.getPitch(entity) * radian));
    };

    /**
     * Entity가 바라보는 Z좌표를 반환합니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @returns {Number} Entity가 바라보는 Z좌표
     */
    Entity.getPointedBlockZ = entity => {
        let radian = Math.PI / 180;
        return Math.floor(Entity.getZ(entity) + 2 * Math.cos(Entity.getYaw(entity) * radian) * Math.cos(Entity.getPitch(entity) * radian));
    };

    /**
     * Entity2가 Entity를 잡게합니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @param {Object} entity2 Entity2
     * @param {Number} power 잡는 강도
     */
    Entity.grab = (entity, entity2, power) => {
        let side = Entity.getDst(entity2, entity);
        Entity.setVelX(entity, (Entity.getX(entity2) - Entity.getX(entity)) / side * power / 100);
        Entity.setVelZ(entity, (Entity.getZ(entity2) - Entity.getZ(entity)) / side * power / 100);
    };

    /**
     * Entity2가 Entity 앞에 있는 지 확인합니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @param {Object} entity2 Entity2
     * @returns {Boolean} Entity2가 Entity 앞에 있으면 true, 없으면 false 반환
     */
    Entity.isFront = (entity, entity2) => {
        let radian = Math.PI / 180,
            x = Entity.getX(entity),
            y = Entity.getY(entity),
            z = Entity.getZ(entity),
            ex = Entity.getX(entity2),
            ey = Entity.getY(entity2),
            ez = Entity.getZ(entity2),
            sin = -Math.sin(Entity.getYaw(entity2) * radian),
            cos = Math.cos(Entity.getYaw(entity2) * radian),
            tan = -Math.sin(Entity.getPitch(entity2) * radian);
        for (let i = 0; i < 15; i += 0.5) {
            if (Level.getDst(x, y, z, ex + sin * i, ey + tan * i, ez + cos * i) < 3) {
                return true;
            }
        }
        return false;
    };

    /**
     * Entity가 Entity2를 바라보고 있는 지 확인합니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @param {Object} entity2 Entity2
     * @returns {Boolean} Entity가 Entity2를 바라보고 있는 지 유무
     */
    Entity.isView = (entity, entity2) => {
        let radian = Math.PI / 180,
            x = Entity.getX(entity),
            y = Entity.getY(entity),
            z = Entity.getZ(entity),
            ex = Entity.getX(entity2),
            ey = Entity.getY(entity2),
            ez = Entity.getZ(entity2),
            sin = -Math.sin(Entity.getYaw(entity2) * radian),
            cos = Math.cos(Entity.getYaw(entity2) * radian),
            tan = -Math.sin(Entity.getPitch(entity2) * radian);
        for (let i = 0; i < 15; i += 0.5) {
            if (Level.getDst(x, y, z, ex + sin * i, ey + tan * i, ez + cos * i) < i) {
                return true;
            }
        }
        return false;
    };

    /**
     * Entity2가 Entity를 당기게 합니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @param {Object} entity2 Entity2
     * @param {Number} power 당기는 강도
     */
    Entity.pull = (entity, entity2, power) => {
        let side = Entity.getDst(entity2, entity);
        Entity.setVelX(entity, (Entity.getX(entity2) - Entity.getX(entity)) / side * power / 100);
        Entity.setVelY(entity, (Entity.getY(entity2) - Entity.getY(entity)) / side * power / 100);
        Entity.setVelZ(entity, (Entity.getZ(entity2) - Entity.getZ(entity)) / side * power / 100);
    };

    /**
     * 플레이어가 보는 방향으로 Entity를 밀어냅니다.
     * @since 2016-05-02
     * @param {Object} entity 밀어낼 Entity
     * @param {Number} power 밀어내는 힘
     */
    Entity.push = (entity, power) => {
        let radian = Math.PI / 180,
            playerEntity = Player.getEntity(),
            sin = -Math.sin(Entity.getYaw(playerEntity) * radian),
            cos = Math.cos(Entity.getYaw(playerEntity) * radian),
            tan = -Math.sin(Entity.getPitch(playerEntity) * radian),
            pcos = Math.cos(Entity.getPitch(playerEntity) * radian);
        Entity.setVelX(entity, power * sin * pcos);
        Entity.setVelY(entity, power * tan);
        Entity.setVelZ(entity, power * cos * pcos);
    };

    /**
     * Entity가 Entity2를 보게합니다.
     * @since 2016-05-02
     * @param {Object} entity Entity
     * @param {Object} entity2 Entity2
     */
    Entity.setSaw = (entity, entity2) => {
        let x = Entity.getX(entity2) - Entity.getX(entity),
            y = Entity.getY(entity2) - Entity.getY(entity),
            z = Entity.getZ(entity2) - Entity.getZ(entity),
            l = Math.sqrt(x * x + z * z),
            c = x / l,
            d = z / l,
            e = x / z,
            f = Math.acos(z / l) * 180 / Math.PI,
            g = Math.atan(y / l),
            h = 0;
        if (c > 0 && d > 0 && e > 0) {
            h = 360 - f;
        } else if (c > 0 && d < 0 && e < 0) {
            h = 360 - f;
        } else if (c < 0 && d < 0 && e > 0) {
            h = f;
        } else if (c < 0 && d > 0 && e < 0) {
            h = f;
        } else if (d === 1) {
            h = 0;
        } else if (c === 1) {
            h = 90;
        } else if (d === -1) {
            h = 180;
        } else if (c === -1) {
            h = 270;
        }
        Entity.setRot(entity, h, -1 * g * 180 / Math.PI);
    };

    /**
     * typeID의 new entity를 만들어 standard entity가 보는 방향으로 power만큼 날립니다.
     * @param {Object} standard entity
     * @param {Number} typeID
     * @param {Number} power of shooting strength
     * @event typeID의 새로운 엔티티를 만들어 기준엔티티가 보는 방향으로 power만큼 날립니다.
     * @return {Object} new entity
     */
    Entity.shoot = (ent, typeID, power) => {
        let pe = ent,
            px = Entity.getX(pe),
            py = Entity.getY(pe),
            pz = Entity.getZ(pe),
            sin = -Math.sin(Entity.getYaw(pe) / 180 * Math.PI),
            cos = Math.cos(Entity.getYaw(pe) / 180 * Math.PI),
            tan = -Math.sin(Entity.getPitch(pe) / 180 * Math.PI),
            pcos = Math.cos(Entity.getPitch(pe) / 180 * Math.PI);

        let bullet = Level.spawnMob(px + 2 * sin * pcos, py + 2 * tan, pz + 2 * cos * pcos, typeID);
        Entity.setVelX(bullet, power * sin * pcos);
        Entity.setVelY(bullet, power * tan);
        Entity.setVelZ(bullet, power * cos * pcos);
        return bullet;
    };

    /**
     * 특정타입의 엔티티를 x, y, z 좌표로 이동시킵니다.
     * @param {Number} x좌표
     * @param {Number} y좌표
     * @param {Number} z좌표
     * @param {Number} typeID
     * @event typeID의 엔티티를 x, y, z 좌표로 이동시킵니다.
     */
    Entity.tpall = (x, y, z, type) => {
        let arr = Entity.getFilterEntity(Entity.getAll(), ent => Entity.getEntityTypeId(ent) === type);
        Entity.action(arr, ent => Entity.setPosition(ent, x, y, z));
    };

})(Entity);

/**
 * @memberOf Entity
 * @namespace particle
 */
(particle => {
    "use strict";

    /**
     * Entity 위치에 파티클을 생성합니다.
     * @since 2016-05-02
     * @memberOf Entity.particle
     * @param {Object} entity Entity
     * @param {Number} velX Vel X
     * @param {Number} velY Vel X
     * @param {Number} velZ Vel X
     * @param {Number} type 파티클 종류
     * @param {Number} size 파티클 크기
     */
    particle.add = (entity, velX, velY, velZ, type, size) => {
        Level.addParticle(type, Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity), velX, velY, velZ, size);
    };


    /**
     * Entity 위치에 랜덤 파티클을 생성합니다.
     * @since 2016-05-02
     * @memberOf Entity.particle
     * @param {Object} entity Entity
     * @param {Number} type 파티클 종류
     * @param {Number} size 파티클 크기
     */
    particle.rnd = (entity, type, size) => {
        let radian = Math.PI / 180;
        Level.addParticle(type, Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity), -Math.sin(Math.floor(Math.random() * 360) * radian), -Math.sin(Math.floor(Math.random() * 360) * radian), Math.cos(Math.floor(Math.random() * 360) * radian), size);
    };

    /**
     * 전방에 곡선 파티클을 생성합니다.
     * @since 2016-05-02
     * @memberOf Entity.particle
     * @param {Object} entity Entity
     * @param {Number} type 파티클 종류
     * @param {Number} size 파티클 크기
     */
    particle.swing = (entity, type, size) => {
        let x = Entity.getX(entity),
            y = Entity.getY(entity),
            z = Entity.getZ(entity),
            yaw = Entity.getYaw(entity),
            sin = -Math.sin(yaw / 180 * Math.PI),
            cos = Math.cos(yaw / 180 * Math.PI);
        for (let A = yaw - 60; A < yaw + 60; A++) {
            Level.addParticle(type, x + -Math.sin(A / 180 * Math.PI) * 2, y - 0.5, z + Math.cos(A / 180 * Math.PI) * 2, sin, 0, cos, size);
        }
    };

    /**
     * Entity와 Entity2를 연결하는 파티클을 생성합니다.
     * @since 2016-05-02
     * @memberOf Entity.particle
     * @param {Object} entity Entity
     * @param {Object} entity2 Entity2
     * @param {Number} type 파티클 종류
     * @param {Number} size 파티클 크기
     */
    particle.connect = (entity, entity2, type, size) => {
        let px = Entity.getX(entity),
            py = Entity.getY(entity),
            pz = Entity.getZ(entity),
            ex = Entity.getX(entity2),
            ey = Entity.getY(entity2),
            ez = Entity.getZ(entity2),
            S = Entity.getDst(entity, entity2) * 3,
            kx = (ex - px) / S,
            ky = (ey - py) / S,
            kz = (ez - pz) / S;
        for (let i = 0; i < S; i++) {
            Level.addParticle(type, px, py, pz, 0, 0, 0, size); //여기를 수정해보세요
            px += kx;
            py += ky;
            pz += kz;
        }
    };

    /**
     * 블록과 블록을 연결하는 파티클을 생성합니다.
     * @since 2016-05-02
     * @memberOf Entity.particle
     * @param {Number} x X 좌표
     * @param {Number} y Y 좌표
     * @param {Number} z Z 좌표
     * @param {Number} x2 X 좌표
     * @param {Number} y2 Y 좌표
     * @param {Number} z2 Z 좌표
     * @param {Number} type 파티클 종류
     * @param {Number} size 파티클 크기
     */
    particle.connectBlock = (x, y, z, x1, y1, z1, type, size) => {
        let s = Level.getDst(x, y, z, x1, y1, z1) * 3,
            kx = (x1 - x) / s,
            ky = (y1 - y) / s,
            kz = (z1 - z) / s;
        for (let i = 0; i < s; i++) {
            Level.addParticle(type, x, y, z, 0, 0, 0, size);
            x += kx;
            y += ky;
            z += kz;
        }
    };

    /**
     * Entity를 기준으로 원형파티클을 생성합니다.
     * @since 2016-05-02
     * @memberOf Entity.particle
     * @param {Object} entity Entity
     * @param {Number} radius 반지름
     * @param {Number} type 파티클 종류
     * @param {Number} size 파티클 크기
     */
    particle.around = (entity, radius, type, size) => {
        let radian = Math.PI / 180,
            x = Entity.getX(entity),
            y = Entity.getY(entity),
            z = Entity.getZ(entity);
        for (let s = 0; s < 90; s++) {
            Level.addParticle(type, x + -Math.sin(s * 4 * radian) * radius, y, z + Math.cos(s * 4 * radian) * radius, 0, 0, 0, size);
        }
    };

    /**
     * Entity를 기준으로 퍼지는 원형파티클을 생성합니다.
     * @since 2016-05-02
     * @memberOf Entity.particle
     * @param {Object} entity Entity
     * @param {Number} radius 반지름
     * @param {Number} type 파티클 종류
     * @param {Number} size 파티클 크기
     */
    particle.spread = (entity, radius, type, size) => {
        let radian = Math.PI / 180,
            x = Entity.getX(entity),
            y = Entity.getY(entity),
            z = Entity.getZ(entity);
        for (let s = 0; s < 90; s++) {
            let sin = -Math.sin(s * 4 * radian),
                cos = Math.cos(s * 4 * radian);
            Level.addParticle(type, x + sin * radius, y, z + cos * radius, sin, 0, cos, size);
        }
    };

})(Entity.particle || (Entity.particle = {}));



/**
 * @namespace Level
 */
(Level => {
    "use strict";

    /**
     * 좌표 사이의 거리를 구합니다.
     * @since 2016-05-02
     * @param {Number} x X 좌표
     * @param {Number} y Y 좌표
     * @param {Number} z Z 좌표
     * @param {Number} x2 X 좌표
     * @param {Number} y2 Y 좌표
     * @param {Number} z2 Z 좌표
     * @returns {Number} 좌표 사이의 거리
     */
    Level.getDst = (x, y, z, x2, y2, z2) => {
        return Math.hypot(x - x2, y - y2, z - z2);
    };

    /**
     * 0부터 n까지의 난수를 반환합니다.
     * @since 2016-05-02
     * @param {Number} n 범위
     * @returns {Number} 난수
     */
    Level.rnd = n => {
        return Math.floor(Math.random() * n);
    };

    /**
     * start부터 end까지의 난수를 반환합니다.
     * @since 2016-05-02
     * @param {Number} start 범위
     * @param {Number} end 범위
     * @returns {Number} 난수
     */
    Level.rnd2Number = (start, end) => {
        let arr = [];
        for (let i = start; i < end; i++) {
            arr.push(i);
        }
        return arr[Math.floor(Math.random() * arr.length)];
    };
})(Level);
