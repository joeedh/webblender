
# parsetab_re.py
# This file is automatically generated. Do not edit.
_tabversion = '3.2'

_lr_method = 'LALR'

_lr_signature = b'\xe3\xf7\x1b^\x13\xcdAc\xfa\xaan\xef\x88\x91db'
    
_lr_action_items = {'STAR':([3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,],[-7,-33,-5,14,-19,-4,-21,-20,-6,32,-15,-11,-18,-16,-14,-13,-17,-12,40,-29,-32,-27,-26,-34,-31,-35,-30,-28,-3,-8,-10,-22,-25,-23,-9,-24,]),'$end':([1,23,41,42,],[0,-37,-1,-36,]),'ID_PART':([2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,],[9,-7,-33,-5,16,-19,-4,-21,-20,-6,31,-15,-11,-18,-16,-14,-13,-17,-12,37,-37,-29,-32,-27,-26,-34,-31,-35,-30,-28,-3,-8,-10,-22,-25,-23,-9,-24,42,-36,]),'DIVIDE':([0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,],[2,-7,-33,-5,17,-19,-4,-21,23,-20,-6,24,-15,-11,-18,-16,-14,-13,-17,-12,-2,-29,-32,-27,-26,-34,-31,-35,-30,-28,-3,-8,-10,-22,-25,-23,-9,-24,]),'RSBRACKET':([2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,],[11,-7,-33,-5,18,-19,-4,-21,-20,-6,29,-15,-11,-18,-16,-14,-13,-17,-12,38,-29,-32,-27,-26,-34,-31,-35,-30,-28,-3,-8,-10,-22,-25,-23,-9,-24,]),'LSBRACKET':([2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,],[4,-7,-33,-5,19,-19,-4,-21,-20,-6,26,-15,-11,-18,-16,-14,-13,-17,-12,4,-29,-32,-27,-26,-34,-31,-35,-30,-28,-3,-8,-10,-22,-25,-23,-9,-24,]),'BACKSLASH':([2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,],[6,-7,-33,-5,20,-19,-4,-21,-20,-6,6,-15,-11,-18,-16,-14,-13,-17,-12,6,-29,-32,-27,-26,-34,-31,-35,-30,-28,-3,-8,-10,-22,-25,-23,-9,-24,]),'UCHAR':([2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,],[7,-7,-33,-5,21,-19,-4,-21,-20,-6,27,-15,-11,-18,-16,-14,-13,-17,-12,36,-29,-32,-27,-26,-34,-31,-35,-30,-28,-3,-8,-10,-22,-25,-23,-9,-24,]),}

_lr_action = { }
for _k, _v in _lr_action_items.items():
   for _x,_y in zip(_v[0],_v[1]):
      if not _x in _lr_action:  _lr_action[_x] = { }
      _lr_action[_x][_k] = _y
del _lr_action_items

_lr_goto_items = {'re_lit':([0,],[1,]),'re_non_term':([6,],[15,]),'re_char':([22,],[33,]),'re_class_char':([13,],[25,]),'re_expr_class':([2,22,],[3,35,]),'re_non_term_restrict2':([22,],[34,]),'re_flags':([23,],[41,]),'re_chars':([8,],[22,]),'re_non_term_restrict3':([13,],[28,]),'re_first_char':([2,],[8,]),'re_non_term_restrict1':([2,],[5,]),'re_class_chars':([4,],[13,]),'re_body':([2,],[10,]),'re_backlash_seq':([2,13,22,],[12,30,39,]),}

_lr_goto = { }
for _k, _v in _lr_goto_items.items():
   for _x,_y in zip(_v[0],_v[1]):
       if not _x in _lr_goto: _lr_goto[_x] = { }
       _lr_goto[_x][_k] = _y
del _lr_goto_items
_lr_productions = [
  ("S' -> re_lit","S'",1,None,None,None),
  ('re_lit -> DIVIDE re_body DIVIDE re_flags','re_lit',4,'p_re_lit','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',51),
  ('re_body -> re_first_char re_chars','re_body',2,'p_re_body','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',56),
  ('re_chars -> re_chars re_char','re_chars',2,'p_re_chars','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',61),
  ('re_chars -> <empty>','re_chars',0,'p_re_chars','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',62),
  ('re_first_char -> re_non_term_restrict1','re_first_char',1,'p_re_first_char','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',71),
  ('re_first_char -> re_backlash_seq','re_first_char',1,'p_re_first_char','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',72),
  ('re_first_char -> re_expr_class','re_first_char',1,'p_re_first_char','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',73),
  ('re_char -> re_non_term_restrict2','re_char',1,'p_re_char','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',79),
  ('re_char -> re_backlash_seq','re_char',1,'p_re_char','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',80),
  ('re_char -> re_expr_class','re_char',1,'p_re_char','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',81),
  ('re_backlash_seq -> BACKSLASH re_non_term','re_backlash_seq',2,'p_re_backlash_seq','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',87),
  ('re_non_term -> UCHAR','re_non_term',1,'p_re_non_term','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',92),
  ('re_non_term -> LSBRACKET','re_non_term',1,'p_re_non_term','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',93),
  ('re_non_term -> RSBRACKET','re_non_term',1,'p_re_non_term','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',94),
  ('re_non_term -> STAR','re_non_term',1,'p_re_non_term','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',95),
  ('re_non_term -> DIVIDE','re_non_term',1,'p_re_non_term','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',96),
  ('re_non_term -> BACKSLASH','re_non_term',1,'p_re_non_term','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',97),
  ('re_non_term -> ID_PART','re_non_term',1,'p_re_non_term','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',98),
  ('re_non_term_restrict1 -> UCHAR','re_non_term_restrict1',1,'p_re_non_term_restrict1','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',103),
  ('re_non_term_restrict1 -> RSBRACKET','re_non_term_restrict1',1,'p_re_non_term_restrict1','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',104),
  ('re_non_term_restrict1 -> ID_PART','re_non_term_restrict1',1,'p_re_non_term_restrict1','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',105),
  ('re_non_term_restrict2 -> UCHAR','re_non_term_restrict2',1,'p_re_non_term_restrict2','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',110),
  ('re_non_term_restrict2 -> RSBRACKET','re_non_term_restrict2',1,'p_re_non_term_restrict2','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',111),
  ('re_non_term_restrict2 -> STAR','re_non_term_restrict2',1,'p_re_non_term_restrict2','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',112),
  ('re_non_term_restrict2 -> ID_PART','re_non_term_restrict2',1,'p_re_non_term_restrict2','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',113),
  ('re_non_term_restrict3 -> UCHAR','re_non_term_restrict3',1,'p_re_non_term_restrict3','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',119),
  ('re_non_term_restrict3 -> LSBRACKET','re_non_term_restrict3',1,'p_re_non_term_restrict3','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',120),
  ('re_non_term_restrict3 -> STAR','re_non_term_restrict3',1,'p_re_non_term_restrict3','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',121),
  ('re_non_term_restrict3 -> DIVIDE','re_non_term_restrict3',1,'p_re_non_term_restrict3','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',122),
  ('re_non_term_restrict3 -> ID_PART','re_non_term_restrict3',1,'p_re_non_term_restrict3','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',123),
  ('re_expr_class -> LSBRACKET re_class_chars RSBRACKET','re_expr_class',3,'p_re_expr_class','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',128),
  ('re_class_chars -> re_class_chars re_class_char','re_class_chars',2,'p_re_class_chars','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',134),
  ('re_class_chars -> <empty>','re_class_chars',0,'p_re_class_chars','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',135),
  ('re_class_char -> re_non_term_restrict3','re_class_char',1,'p_re_class_char','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',144),
  ('re_class_char -> re_backlash_seq','re_class_char',1,'p_re_class_char','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',145),
  ('re_flags -> re_flags ID_PART','re_flags',2,'p_re_flags','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',151),
  ('re_flags -> <empty>','re_flags',0,'p_re_flags','c:\\dev\\fairmotion\\tools\\extjs_cc\\js_regexpr_parse.py',152),
]
