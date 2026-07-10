(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS({
    "node_modules/dayjs/dayjs.min.js"(exports, module) {
      !function(t, e) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs = e();
      }(exports, function() {
        "use strict";
        var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
          var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
          return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
        } }, m = function(t2, e2, n2) {
          var r2 = String(t2);
          return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
        }, v = { s: m, z: function(t2) {
          var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
          return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
        }, m: function t2(e2, n2) {
          if (e2.date() < n2.date())
            return -t2(n2, e2);
          var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
          return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
        }, a: function(t2) {
          return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
        }, p: function(t2) {
          return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t2) {
          return t2 === void 0;
        } }, g = "en", D = {};
        D[g] = M;
        var p = function(t2) {
          return t2 instanceof _;
        }, S = function t2(e2, n2, r2) {
          var i2;
          if (!e2)
            return g;
          if (typeof e2 == "string") {
            var s2 = e2.toLowerCase();
            D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
            var u2 = e2.split("-");
            if (!i2 && u2.length > 1)
              return t2(u2[0]);
          } else {
            var a2 = e2.name;
            D[a2] = e2, i2 = a2;
          }
          return !r2 && i2 && (g = i2), i2 || !r2 && g;
        }, w = function(t2, e2) {
          if (p(t2))
            return t2.clone();
          var n2 = typeof e2 == "object" ? e2 : {};
          return n2.date = t2, n2.args = arguments, new _(n2);
        }, O = v;
        O.l = S, O.i = p, O.w = function(t2, e2) {
          return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
        };
        var _ = function() {
          function M2(t2) {
            this.$L = S(t2.locale, null, true), this.parse(t2);
          }
          var m2 = M2.prototype;
          return m2.parse = function(t2) {
            this.$d = function(t3) {
              var e2 = t3.date, n2 = t3.utc;
              if (e2 === null)
                return new Date(NaN);
              if (O.u(e2))
                return new Date();
              if (e2 instanceof Date)
                return new Date(e2);
              if (typeof e2 == "string" && !/Z$/i.test(e2)) {
                var r2 = e2.match($);
                if (r2) {
                  var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                  return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                }
              }
              return new Date(e2);
            }(t2), this.$x = t2.x || {}, this.init();
          }, m2.init = function() {
            var t2 = this.$d;
            this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
          }, m2.$utils = function() {
            return O;
          }, m2.isValid = function() {
            return !(this.$d.toString() === l);
          }, m2.isSame = function(t2, e2) {
            var n2 = w(t2);
            return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
          }, m2.isAfter = function(t2, e2) {
            return w(t2) < this.startOf(e2);
          }, m2.isBefore = function(t2, e2) {
            return this.endOf(e2) < w(t2);
          }, m2.$g = function(t2, e2, n2) {
            return O.u(t2) ? this[e2] : this.set(n2, t2);
          }, m2.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m2.valueOf = function() {
            return this.$d.getTime();
          }, m2.startOf = function(t2, e2) {
            var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), l2 = function(t3, e3) {
              var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
              return r2 ? i2 : i2.endOf(a);
            }, $2 = function(t3, e3) {
              return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
            switch (h2) {
              case c:
                return r2 ? l2(1, 0) : l2(31, 11);
              case f:
                return r2 ? l2(1, M3) : l2(0, M3 + 1);
              case o:
                var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
              case a:
              case d:
                return $2(v2 + "Hours", 0);
              case u:
                return $2(v2 + "Minutes", 1);
              case s:
                return $2(v2 + "Seconds", 2);
              case i:
                return $2(v2 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m2.endOf = function(t2) {
            return this.startOf(t2, false);
          }, m2.$set = function(t2, e2) {
            var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
            if (o2 === f || o2 === c) {
              var y2 = this.clone().set(d, 1);
              y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
            } else
              l2 && this.$d[l2]($2);
            return this.init(), this;
          }, m2.set = function(t2, e2) {
            return this.clone().$set(t2, e2);
          }, m2.get = function(t2) {
            return this[O.p(t2)]();
          }, m2.add = function(r2, h2) {
            var d2, l2 = this;
            r2 = Number(r2);
            var $2 = O.p(h2), y2 = function(t2) {
              var e2 = w(l2);
              return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
            };
            if ($2 === f)
              return this.set(f, this.$M + r2);
            if ($2 === c)
              return this.set(c, this.$y + r2);
            if ($2 === a)
              return y2(1);
            if ($2 === o)
              return y2(7);
            var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
            return O.w(m3, this);
          }, m2.subtract = function(t2, e2) {
            return this.add(-1 * t2, e2);
          }, m2.format = function(t2) {
            var e2 = this, n2 = this.$locale();
            if (!this.isValid())
              return n2.invalidDate || l;
            var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
              return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
            }, c2 = function(t3) {
              return O.s(s2 % 12 || 12, t3, "0");
            }, d2 = n2.meridiem || function(t3, e3, n3) {
              var r3 = t3 < 12 ? "AM" : "PM";
              return n3 ? r3.toLowerCase() : r3;
            }, $2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
            return r2.replace(y, function(t3, e3) {
              return e3 || $2[t3] || i2.replace(":", "");
            });
          }, m2.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m2.diff = function(r2, d2, l2) {
            var $2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, v2 = this - M3, g2 = O.m(this, M3);
            return g2 = ($2 = {}, $2[c] = g2 / 12, $2[f] = g2, $2[h] = g2 / 3, $2[o] = (v2 - m3) / 6048e5, $2[a] = (v2 - m3) / 864e5, $2[u] = v2 / n, $2[s] = v2 / e, $2[i] = v2 / t, $2)[y2] || v2, l2 ? g2 : O.a(g2);
          }, m2.daysInMonth = function() {
            return this.endOf(f).$D;
          }, m2.$locale = function() {
            return D[this.$L];
          }, m2.locale = function(t2, e2) {
            if (!t2)
              return this.$L;
            var n2 = this.clone(), r2 = S(t2, e2, true);
            return r2 && (n2.$L = r2), n2;
          }, m2.clone = function() {
            return O.w(this.$d, this);
          }, m2.toDate = function() {
            return new Date(this.valueOf());
          }, m2.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m2.toISOString = function() {
            return this.$d.toISOString();
          }, m2.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        }(), T = _.prototype;
        return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
          T[t2[1]] = function(e2) {
            return this.$g(e2, t2[0], t2[1]);
          };
        }), w.extend = function(t2, e2) {
          return t2.$i || (t2(e2, _, w), t2.$i = true), w;
        }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
          return w(1e3 * t2);
        }, w.en = D[g], w.Ls = D, w.p = {}, w;
      });
    }
  });

  // node_modules/dayjs/plugin/utc.js
  var require_utc = __commonJS({
    "node_modules/dayjs/plugin/utc.js"(exports, module) {
      !function(t, i) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = i() : typeof define == "function" && define.amd ? define(i) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs_plugin_utc = i();
      }(exports, function() {
        "use strict";
        var t = "minute", i = /[+-]\d\d(?::?\d\d)?/g, e = /([+-]|\d\d)/g;
        return function(s, f, n) {
          var u = f.prototype;
          n.utc = function(t2) {
            var i2 = { date: t2, utc: true, args: arguments };
            return new f(i2);
          }, u.utc = function(i2) {
            var e2 = n(this.toDate(), { locale: this.$L, utc: true });
            return i2 ? e2.add(this.utcOffset(), t) : e2;
          }, u.local = function() {
            return n(this.toDate(), { locale: this.$L, utc: false });
          };
          var o = u.parse;
          u.parse = function(t2) {
            t2.utc && (this.$u = true), this.$utils().u(t2.$offset) || (this.$offset = t2.$offset), o.call(this, t2);
          };
          var r = u.init;
          u.init = function() {
            if (this.$u) {
              var t2 = this.$d;
              this.$y = t2.getUTCFullYear(), this.$M = t2.getUTCMonth(), this.$D = t2.getUTCDate(), this.$W = t2.getUTCDay(), this.$H = t2.getUTCHours(), this.$m = t2.getUTCMinutes(), this.$s = t2.getUTCSeconds(), this.$ms = t2.getUTCMilliseconds();
            } else
              r.call(this);
          };
          var a = u.utcOffset;
          u.utcOffset = function(s2, f2) {
            var n2 = this.$utils().u;
            if (n2(s2))
              return this.$u ? 0 : n2(this.$offset) ? a.call(this) : this.$offset;
            if (typeof s2 == "string" && (s2 = function(t2) {
              t2 === void 0 && (t2 = "");
              var s3 = t2.match(i);
              if (!s3)
                return null;
              var f3 = ("" + s3[0]).match(e) || ["-", 0, 0], n3 = f3[0], u3 = 60 * +f3[1] + +f3[2];
              return u3 === 0 ? 0 : n3 === "+" ? u3 : -u3;
            }(s2), s2 === null))
              return this;
            var u2 = Math.abs(s2) <= 16 ? 60 * s2 : s2, o2 = this;
            if (f2)
              return o2.$offset = u2, o2.$u = s2 === 0, o2;
            if (s2 !== 0) {
              var r2 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
              (o2 = this.local().add(u2 + r2, t)).$offset = u2, o2.$x.$localOffset = r2;
            } else
              o2 = this.utc();
            return o2;
          };
          var h = u.format;
          u.format = function(t2) {
            var i2 = t2 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
            return h.call(this, i2);
          }, u.valueOf = function() {
            var t2 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
            return this.$d.valueOf() - 6e4 * t2;
          }, u.isUTC = function() {
            return !!this.$u;
          }, u.toISOString = function() {
            return this.toDate().toISOString();
          }, u.toString = function() {
            return this.toDate().toUTCString();
          };
          var l = u.toDate;
          u.toDate = function(t2) {
            return t2 === "s" && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
          };
          var c = u.diff;
          u.diff = function(t2, i2, e2) {
            if (t2 && this.$u === t2.$u)
              return c.call(this, t2, i2, e2);
            var s2 = this.local(), f2 = n(t2).local();
            return c.call(s2, f2, i2, e2);
          };
        };
      });
    }
  });

  // node_modules/dayjs/plugin/timezone.js
  var require_timezone = __commonJS({
    "node_modules/dayjs/plugin/timezone.js"(exports, module) {
      !function(t, e) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs_plugin_timezone = e();
      }(exports, function() {
        "use strict";
        var t = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, e = {};
        return function(n, i, o) {
          var r, a = function(t2, n2, i2) {
            i2 === void 0 && (i2 = {});
            var o2 = new Date(t2), r2 = function(t3, n3) {
              n3 === void 0 && (n3 = {});
              var i3 = n3.timeZoneName || "short", o3 = t3 + "|" + i3, r3 = e[o3];
              return r3 || (r3 = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: t3, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: i3 }), e[o3] = r3), r3;
            }(n2, i2);
            return r2.formatToParts(o2);
          }, u = function(e2, n2) {
            for (var i2 = a(e2, n2), r2 = [], u2 = 0; u2 < i2.length; u2 += 1) {
              var f2 = i2[u2], s2 = f2.type, m = f2.value, c = t[s2];
              c >= 0 && (r2[c] = parseInt(m, 10));
            }
            var d = r2[3], l = d === 24 ? 0 : d, v = r2[0] + "-" + r2[1] + "-" + r2[2] + " " + l + ":" + r2[4] + ":" + r2[5] + ":000", h = +e2;
            return (o.utc(v).valueOf() - (h -= h % 1e3)) / 6e4;
          }, f = i.prototype;
          f.tz = function(t2, e2) {
            t2 === void 0 && (t2 = r);
            var n2 = this.utcOffset(), i2 = this.toDate(), a2 = i2.toLocaleString("en-US", { timeZone: t2 }), u2 = Math.round((i2 - new Date(a2)) / 1e3 / 60), f2 = o(a2).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(i2.getTimezoneOffset() / 15) - u2, true);
            if (e2) {
              var s2 = f2.utcOffset();
              f2 = f2.add(n2 - s2, "minute");
            }
            return f2.$x.$timezone = t2, f2;
          }, f.offsetName = function(t2) {
            var e2 = this.$x.$timezone || o.tz.guess(), n2 = a(this.valueOf(), e2, { timeZoneName: t2 }).find(function(t3) {
              return t3.type.toLowerCase() === "timezonename";
            });
            return n2 && n2.value;
          };
          var s = f.startOf;
          f.startOf = function(t2, e2) {
            if (!this.$x || !this.$x.$timezone)
              return s.call(this, t2, e2);
            var n2 = o(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
            return s.call(n2, t2, e2).tz(this.$x.$timezone, true);
          }, o.tz = function(t2, e2, n2) {
            var i2 = n2 && e2, a2 = n2 || e2 || r, f2 = u(+o(), a2);
            if (typeof t2 != "string")
              return o(t2).tz(a2);
            var s2 = function(t3, e3, n3) {
              var i3 = t3 - 60 * e3 * 1e3, o2 = u(i3, n3);
              if (e3 === o2)
                return [i3, e3];
              var r2 = u(i3 -= 60 * (o2 - e3) * 1e3, n3);
              return o2 === r2 ? [i3, o2] : [t3 - 60 * Math.min(o2, r2) * 1e3, Math.max(o2, r2)];
            }(o.utc(t2, i2).valueOf(), f2, a2), m = s2[0], c = s2[1], d = o(m).utcOffset(c);
            return d.$x.$timezone = a2, d;
          }, o.tz.guess = function() {
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
          }, o.tz.setDefault = function(t2) {
            r = t2;
          };
        };
      });
    }
  });

  // node_modules/dayjs/plugin/duration.js
  var require_duration = __commonJS({
    "node_modules/dayjs/plugin/duration.js"(exports, module) {
      !function(t, s) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = s() : typeof define == "function" && define.amd ? define(s) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs_plugin_duration = s();
      }(exports, function() {
        "use strict";
        var t, s, n = 1e3, i = 6e4, e = 36e5, r = 864e5, o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, u = 31536e6, h = 2592e6, a = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, d = { years: u, months: h, days: r, hours: e, minutes: i, seconds: n, milliseconds: 1, weeks: 6048e5 }, c = function(t2) {
          return t2 instanceof p;
        }, f = function(t2, s2, n2) {
          return new p(t2, n2, s2.$l);
        }, m = function(t2) {
          return s.p(t2) + "s";
        }, l = function(t2) {
          return t2 < 0;
        }, $ = function(t2) {
          return l(t2) ? Math.ceil(t2) : Math.floor(t2);
        }, y = function(t2) {
          return Math.abs(t2);
        }, g = function(t2, s2) {
          return t2 ? l(t2) ? { negative: true, format: "" + y(t2) + s2 } : { negative: false, format: "" + t2 + s2 } : { negative: false, format: "" };
        }, p = function() {
          function l2(t2, s2, n2) {
            var i2 = this;
            if (this.$d = {}, this.$l = n2, t2 === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), s2)
              return f(t2 * d[m(s2)], this);
            if (typeof t2 == "number")
              return this.$ms = t2, this.parseFromMilliseconds(), this;
            if (typeof t2 == "object")
              return Object.keys(t2).forEach(function(s3) {
                i2.$d[m(s3)] = t2[s3];
              }), this.calMilliseconds(), this;
            if (typeof t2 == "string") {
              var e2 = t2.match(a);
              if (e2) {
                var r2 = e2.slice(2).map(function(t3) {
                  return t3 != null ? Number(t3) : 0;
                });
                return this.$d.years = r2[0], this.$d.months = r2[1], this.$d.weeks = r2[2], this.$d.days = r2[3], this.$d.hours = r2[4], this.$d.minutes = r2[5], this.$d.seconds = r2[6], this.calMilliseconds(), this;
              }
            }
            return this;
          }
          var y2 = l2.prototype;
          return y2.calMilliseconds = function() {
            var t2 = this;
            this.$ms = Object.keys(this.$d).reduce(function(s2, n2) {
              return s2 + (t2.$d[n2] || 0) * d[n2];
            }, 0);
          }, y2.parseFromMilliseconds = function() {
            var t2 = this.$ms;
            this.$d.years = $(t2 / u), t2 %= u, this.$d.months = $(t2 / h), t2 %= h, this.$d.days = $(t2 / r), t2 %= r, this.$d.hours = $(t2 / e), t2 %= e, this.$d.minutes = $(t2 / i), t2 %= i, this.$d.seconds = $(t2 / n), t2 %= n, this.$d.milliseconds = t2;
          }, y2.toISOString = function() {
            var t2 = g(this.$d.years, "Y"), s2 = g(this.$d.months, "M"), n2 = +this.$d.days || 0;
            this.$d.weeks && (n2 += 7 * this.$d.weeks);
            var i2 = g(n2, "D"), e2 = g(this.$d.hours, "H"), r2 = g(this.$d.minutes, "M"), o2 = this.$d.seconds || 0;
            this.$d.milliseconds && (o2 += this.$d.milliseconds / 1e3);
            var u2 = g(o2, "S"), h2 = t2.negative || s2.negative || i2.negative || e2.negative || r2.negative || u2.negative, a2 = e2.format || r2.format || u2.format ? "T" : "", d2 = (h2 ? "-" : "") + "P" + t2.format + s2.format + i2.format + a2 + e2.format + r2.format + u2.format;
            return d2 === "P" || d2 === "-P" ? "P0D" : d2;
          }, y2.toJSON = function() {
            return this.toISOString();
          }, y2.format = function(t2) {
            var n2 = t2 || "YYYY-MM-DDTHH:mm:ss", i2 = { Y: this.$d.years, YY: s.s(this.$d.years, 2, "0"), YYYY: s.s(this.$d.years, 4, "0"), M: this.$d.months, MM: s.s(this.$d.months, 2, "0"), D: this.$d.days, DD: s.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: s.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: s.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: s.s(this.$d.seconds, 2, "0"), SSS: s.s(this.$d.milliseconds, 3, "0") };
            return n2.replace(o, function(t3, s2) {
              return s2 || String(i2[t3]);
            });
          }, y2.as = function(t2) {
            return this.$ms / d[m(t2)];
          }, y2.get = function(t2) {
            var s2 = this.$ms, n2 = m(t2);
            return n2 === "milliseconds" ? s2 %= 1e3 : s2 = n2 === "weeks" ? $(s2 / d[n2]) : this.$d[n2], s2 === 0 ? 0 : s2;
          }, y2.add = function(t2, s2, n2) {
            var i2;
            return i2 = s2 ? t2 * d[m(s2)] : c(t2) ? t2.$ms : f(t2, this).$ms, f(this.$ms + i2 * (n2 ? -1 : 1), this);
          }, y2.subtract = function(t2, s2) {
            return this.add(t2, s2, true);
          }, y2.locale = function(t2) {
            var s2 = this.clone();
            return s2.$l = t2, s2;
          }, y2.clone = function() {
            return f(this.$ms, this);
          }, y2.humanize = function(s2) {
            return t().add(this.$ms, "ms").locale(this.$l).fromNow(!s2);
          }, y2.milliseconds = function() {
            return this.get("milliseconds");
          }, y2.asMilliseconds = function() {
            return this.as("milliseconds");
          }, y2.seconds = function() {
            return this.get("seconds");
          }, y2.asSeconds = function() {
            return this.as("seconds");
          }, y2.minutes = function() {
            return this.get("minutes");
          }, y2.asMinutes = function() {
            return this.as("minutes");
          }, y2.hours = function() {
            return this.get("hours");
          }, y2.asHours = function() {
            return this.as("hours");
          }, y2.days = function() {
            return this.get("days");
          }, y2.asDays = function() {
            return this.as("days");
          }, y2.weeks = function() {
            return this.get("weeks");
          }, y2.asWeeks = function() {
            return this.as("weeks");
          }, y2.months = function() {
            return this.get("months");
          }, y2.asMonths = function() {
            return this.as("months");
          }, y2.years = function() {
            return this.get("years");
          }, y2.asYears = function() {
            return this.as("years");
          }, l2;
        }();
        return function(n2, i2, e2) {
          t = e2, s = e2().$utils(), e2.duration = function(t2, s2) {
            var n3 = e2.locale();
            return f(t2, { $l: n3 }, s2);
          }, e2.isDuration = c;
          var r2 = i2.prototype.add, o2 = i2.prototype.subtract;
          i2.prototype.add = function(t2, s2) {
            return c(t2) && (t2 = t2.asMilliseconds()), r2.bind(this)(t2, s2);
          }, i2.prototype.subtract = function(t2, s2) {
            return c(t2) && (t2 = t2.asMilliseconds()), o2.bind(this)(t2, s2);
          };
        };
      });
    }
  });

  // node_modules/dayjs/plugin/advancedFormat.js
  var require_advancedFormat = __commonJS({
    "node_modules/dayjs/plugin/advancedFormat.js"(exports, module) {
      !function(e, t) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = t() : typeof define == "function" && define.amd ? define(t) : (e = typeof globalThis != "undefined" ? globalThis : e || self).dayjs_plugin_advancedFormat = t();
      }(exports, function() {
        "use strict";
        return function(e, t) {
          var r = t.prototype, n = r.format;
          r.format = function(e2) {
            var t2 = this, r2 = this.$locale();
            if (!this.isValid())
              return n.bind(this)(e2);
            var s = this.$utils(), a = (e2 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(e3) {
              switch (e3) {
                case "Q":
                  return Math.ceil((t2.$M + 1) / 3);
                case "Do":
                  return r2.ordinal(t2.$D);
                case "gggg":
                  return t2.weekYear();
                case "GGGG":
                  return t2.isoWeekYear();
                case "wo":
                  return r2.ordinal(t2.week(), "W");
                case "w":
                case "ww":
                  return s.s(t2.week(), e3 === "w" ? 1 : 2, "0");
                case "W":
                case "WW":
                  return s.s(t2.isoWeek(), e3 === "W" ? 1 : 2, "0");
                case "k":
                case "kk":
                  return s.s(String(t2.$H === 0 ? 24 : t2.$H), e3 === "k" ? 1 : 2, "0");
                case "X":
                  return Math.floor(t2.$d.getTime() / 1e3);
                case "x":
                  return t2.$d.getTime();
                case "z":
                  return "[" + t2.offsetName() + "]";
                case "zzz":
                  return "[" + t2.offsetName("long") + "]";
                default:
                  return e3;
              }
            });
            return n.bind(this)(a);
          };
        };
      });
    }
  });

  // js/status.ts
  var import_dayjs = __toModule(require_dayjs_min());
  var import_utc = __toModule(require_utc());
  var import_timezone = __toModule(require_timezone());
  var import_duration = __toModule(require_duration());
  var import_advancedFormat = __toModule(require_advancedFormat());

  // js/bs.ts
  function createToast(level, title, message, extra) {
    let iconName = "mdi-alert";
    switch (level) {
      case "warning":
        iconName = "mdi-alert";
        break;
      case "success":
        iconName = "mdi-check-circle";
        break;
      case "info":
        iconName = "mdi-information";
        break;
      case "danger":
        iconName = "mdi-alert";
        break;
    }
    const container = document.createElement("div");
    container.setAttribute("class", "toast-container position-fixed bottom-0 end-0 m-3");
    const main = document.createElement("div");
    main.setAttribute("class", `toast bg-${level}`);
    main.setAttribute("role", "alert");
    main.setAttribute("aria-live", "assertive");
    main.setAttribute("aria-atomic", "true");
    const header = document.createElement("div");
    header.setAttribute("class", `toast-header bg-${level} text-body`);
    const icon = document.createElement("i");
    icon.setAttribute("class", `mdi ${iconName}`);
    const titleElement = document.createElement("strong");
    titleElement.setAttribute("class", "me-auto ms-1");
    titleElement.innerText = title;
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn-close");
    button.setAttribute("data-bs-dismiss", "toast");
    button.setAttribute("aria-label", "Close");
    const body = document.createElement("div");
    body.setAttribute("class", "toast-body");
    header.appendChild(icon);
    header.appendChild(titleElement);
    if (typeof extra !== "undefined") {
      const extraElement = document.createElement("small");
      extraElement.setAttribute("class", "text-muted");
      header.appendChild(extraElement);
    }
    header.appendChild(button);
    body.innerText = message.trim();
    main.appendChild(header);
    main.appendChild(body);
    container.appendChild(main);
    document.body.appendChild(container);
    const toast = new window.bootstrap.Toast(main);
    return toast;
  }

  // js/util.ts
  function hasError(data) {
    return "error" in data;
  }
  function isTruthy(value) {
    const badStrings = ["", "null", "undefined"];
    if (Array.isArray(value)) {
      return value.length > 0;
    } else if (typeof value === "string" && !badStrings.includes(value)) {
      return true;
    } else if (typeof value === "number") {
      return true;
    } else if (typeof value === "boolean") {
      return true;
    } else if (typeof value === "object" && value !== null) {
      return true;
    }
    return false;
  }
  async function apiRequest(url, method, data) {
    const token = window.CSRF_TOKEN;
    const headers = new Headers({ "X-CSRFToken": token });
    let body;
    if (typeof data !== "undefined") {
      body = JSON.stringify(data);
      headers.set("content-type", "application/json");
    }
    const res = await fetch(url, { method, body, headers, credentials: "same-origin" });
    const contentType = res.headers.get("Content-Type");
    if (typeof contentType === "string" && contentType.includes("text")) {
      const error = await res.text();
      return { error };
    }
    const json = await res.json();
    if (!res.ok && Array.isArray(json)) {
      const error = json.join("\n");
      return { error };
    } else if (!res.ok && "detail" in json) {
      return { error: json.detail };
    }
    return json;
  }
  async function apiGetBase(url) {
    return await apiRequest(url, "GET");
  }
  function* getElements(...key) {
    for (const query of key) {
      for (const element of document.querySelectorAll(query)) {
        if (element !== null) {
          yield element;
        }
      }
    }
  }
  function getNetboxData(key) {
    if (!key.startsWith("data-")) {
      key = `data-${key}`;
    }
    var parent_div = document.getElementById("netbox-data");
    for (const element of parent_div.children) {
      const value = element.getAttribute(key);
      if (isTruthy(value)) {
        return value;
      }
    }
    return null;
  }
  function toggleVisibility(element, action) {
    if (element !== null) {
      if (typeof action === "undefined") {
        const current = window.getComputedStyle(element).display;
        if (current === "none") {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      } else {
        if (action === "show") {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      }
    }
  }
  function toggleLoader(action) {
    for (const element of getElements("div.card-overlay")) {
      toggleVisibility(element, action);
    }
  }
  function createElement(tag, properties, classes = null, children = []) {
    const element = document.createElement(tag);
    if (properties !== null) {
      for (const k of Object.keys(properties)) {
        const key = k;
        const value = properties[key];
        if (key in element) {
          element[key] = value;
        }
      }
    }
    if (classes !== null && classes.length > 0) {
      element.classList.add(...classes);
    }
    for (const child of children) {
      element.appendChild(child);
    }
    return element;
  }
  function cToF(celsius) {
    return Math.round((celsius * (9 / 5) + 32 + Number.EPSILON) * 10) / 10;
  }

  // js/status.ts
  import_dayjs.default.extend(import_utc.default);
  import_dayjs.default.extend(import_timezone.default);
  import_dayjs.default.extend(import_advancedFormat.default);
  import_dayjs.default.extend(import_duration.default);
  var factKeys = [
    "hostname",
    "fqdn",
    "vendor",
    "model",
    "serial_number",
    "os_version"
  ];
  var formatKeys = ["years", "months", "days", "hours", "minutes", "seconds"];
  function getUptime(seconds) {
    const relDate = new Date();
    const offset = relDate.getTimezoneOffset();
    const relNow = (0, import_dayjs.default)(relDate);
    const relThen = relNow.subtract(seconds, "seconds");
    const utc2 = relThen.tz("Etc/UTC").format("YYYY-MM-DD HH:MM:ss z");
    let zoned = null;
    if (offset !== 0) {
      zoned = relThen.format("YYYY-MM-DD HH:MM:ss z");
    }
    const between = import_dayjs.default.duration(seconds, "seconds");
    let parts = [];
    for (const key of formatKeys) {
      const value = between[key]();
      if (value === 1) {
        const label = key.replace(/s$/, "");
        parts = [...parts, `${value} ${label}`];
      } else if (value > 1) {
        parts = [...parts, `${value} ${key}`];
      }
    }
    let duration2 = "None";
    if (parts.length > 0) {
      duration2 = parts.join(", ");
    }
    return { utc: utc2, zoned, duration: duration2 };
  }
  function processFacts(facts) {
    for (const key of factKeys) {
      if (key in facts) {
        const element = document.getElementById(key);
        if (element !== null) {
          element.innerHTML = String(facts[key]);
        }
      }
    }
    const { uptime } = facts;
    const { utc: utc2, zoned, duration: duration2 } = getUptime(uptime);
    const uptimeDurationElement = document.getElementById("uptime-duration");
    if (uptimeDurationElement !== null) {
      uptimeDurationElement.innerHTML = duration2;
    }
    const uptimeElement = document.getElementById("uptime");
    if (uptimeElement !== null) {
      if (zoned === null) {
        uptimeElement.innerHTML = utc2;
      } else {
        uptimeElement.innerHTML = [zoned, `<span class="fst-italic d-block">${utc2}</span>`].join("");
      }
    }
  }
  function insertTitleRow(next, title1, title2) {
    const col1Title = createElement("th", { innerText: title1 }, ["border-end", "text-end"]);
    const col2Title = createElement("th", { innerText: title2 }, ["border-start", "text-start"]);
    const titleRow = createElement("tr", {}, [], [col1Title, col2Title]);
    next.insertAdjacentElement("beforebegin", titleRow);
  }
  function insertNoneRow(next) {
    const none = createElement("td", { colSpan: "2", innerText: "No Data" }, [
      "text-muted",
      "text-center"
    ]);
    const titleRow = createElement("tr", {}, [], [none]);
    if (next !== null) {
      next.insertAdjacentElement("beforebegin", titleRow);
    }
  }
  function getNext(id) {
    const element = document.getElementById(id);
    if (element !== null) {
      return element.nextElementSibling;
    }
    return null;
  }
  function processCpu(cpu) {
    const next = getNext("status-cpu");
    if (typeof cpu !== "undefined") {
      if (next !== null) {
        insertTitleRow(next, "Name", "Usage");
        for (const [core, data] of Object.entries(cpu)) {
          const usage = data["%usage"];
          const kCell = createElement("td", { innerText: core }, ["border-end", "text-end"]);
          const vCell = createElement("td", { innerText: `${usage} %` }, [
            "border-start",
            "text-start"
          ]);
          const row = createElement("tr", {}, [], [kCell, vCell]);
          next.insertAdjacentElement("beforebegin", row);
        }
      }
    } else {
      insertNoneRow(next);
    }
  }
  function processMemory(mem) {
    const next = getNext("status-memory");
    if (typeof mem !== "undefined") {
      if (next !== null) {
        insertTitleRow(next, "Available", "Used");
        const { available_ram: avail, used_ram: used } = mem;
        const aCell = createElement("td", { innerText: avail }, ["border-end", "text-end"]);
        const uCell = createElement("td", { innerText: used }, ["border-start", "text-start"]);
        const row = createElement("tr", {}, [], [aCell, uCell]);
        next.insertAdjacentElement("beforebegin", row);
      }
    } else {
      insertNoneRow(next);
    }
  }
  function processTemp(temp) {
    const next = getNext("status-temperature");
    if (typeof temp !== "undefined") {
      if (next !== null) {
        insertTitleRow(next, "Sensor", "Value");
        for (const [sensor, data] of Object.entries(temp)) {
          const tempC = data.temperature;
          const tempF = cToF(tempC);
          const innerHTML = `${tempC} \xB0C <span class="ms-1 text-muted small">${tempF} \xB0F</span>`;
          const status = data.is_alert ? "warning" : data.is_critical ? "danger" : "success";
          const kCell = createElement("td", { innerText: sensor }, ["border-end", "text-end"]);
          const vCell = createElement("td", { innerHTML }, ["border-start", "text-start"]);
          const row = createElement("tr", {}, [`table-${status}`], [kCell, vCell]);
          next.insertAdjacentElement("beforebegin", row);
        }
      }
    } else {
      insertNoneRow(next);
    }
  }
  function processFans(fans) {
    const next = getNext("status-fans");
    if (typeof fans !== "undefined") {
      if (next !== null) {
        insertTitleRow(next, "Fan", "Status");
        for (const [fan, data] of Object.entries(fans)) {
          const { status } = data;
          const goodIcon = createElement("i", {}, ["mdi", "mdi-check-bold", "text-success"]);
          const badIcon = createElement("i", {}, ["mdi", "mdi-close", "text-warning"]);
          const kCell = createElement("td", { innerText: fan }, ["border-end", "text-end"]);
          const vCell = createElement("td", {}, ["border-start", "text-start"], [status ? goodIcon : badIcon]);
          const row = createElement("tr", {}, [`table-${status ? "success" : "warning"}`], [kCell, vCell]);
          next.insertAdjacentElement("beforebegin", row);
        }
      }
    } else {
      insertNoneRow(next);
    }
  }
  function processPower(power) {
    const next = getNext("status-power");
    if (typeof power !== "undefined") {
      if (next !== null) {
        insertTitleRow(next, "PSU", "Status");
        for (const [psu, data] of Object.entries(power)) {
          const { status } = data;
          const goodIcon = createElement("i", {}, ["mdi", "mdi-check-bold", "text-success"]);
          const badIcon = createElement("i", {}, ["mdi", "mdi-close", "text-warning"]);
          const kCell = createElement("td", { innerText: psu }, ["border-end", "text-end"]);
          const vCell = createElement("td", {}, ["border-start", "text-start"], [status ? goodIcon : badIcon]);
          const row = createElement("tr", {}, [`table-${status ? "success" : "warning"}`], [kCell, vCell]);
          next.insertAdjacentElement("beforebegin", row);
        }
      }
    } else {
      insertNoneRow(next);
    }
  }
  function processEnvironment(env) {
    const { cpu, memory, temperature, fans, power } = env;
    processCpu(cpu);
    processMemory(memory);
    processTemp(temperature);
    processFans(fans);
    processPower(power);
  }
  function initStatus() {
    toggleLoader("show");
    const url = getNetboxData("data-object-url");
    if (url !== null) {
      apiGetBase(url).then((data) => {
        if (hasError(data)) {
          createToast("danger", "Error Fetching Device Status", data.error).show();
        } else {
          if (!hasError(data.get_facts)) {
            processFacts(data.get_facts);
          } else {
            createToast("danger", "Error Fetching Device Facts", data.get_facts.error).show();
          }
          if (!hasError(data.get_environment)) {
            processEnvironment(data.get_environment);
          } else {
            createToast("danger", "Error Fetching Device Environment Data", data.get_environment.error).show();
          }
        }
        return;
      }).finally(() => toggleLoader("hide"));
    } else {
      toggleLoader("hide");
    }
  }
  if (document.readyState !== "loading") {
    initStatus();
  } else {
    document.addEventListener("DOMContentLoaded", initStatus);
  }
})();
