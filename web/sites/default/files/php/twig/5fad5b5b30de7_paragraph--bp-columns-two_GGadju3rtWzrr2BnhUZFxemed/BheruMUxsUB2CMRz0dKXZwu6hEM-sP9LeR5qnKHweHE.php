<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* modules/contrib/bootstrap_paragraphs/templates/paragraph--bp-columns-two-uneven.html.twig */
class __TwigTemplate_0913249ac51d7e21d153e034dfa79a841ab24c2e1da793e6f2d0379b4f9d1ef4 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 46, "set" => 47];
        $filters = ["escape" => 40, "render" => 46, "clean_class" => 143, "merge" => 152, "without" => 173];
        $functions = ["attach_library" => 40];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
                ['escape', 'render', 'clean_class', 'merge', 'without'],
                ['attach_library']
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 39
        echo "
";
        // line 40
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->attachLibrary("bootstrap_paragraphs/bootstrap-paragraphs"), "html", null, true);
        echo "
";
        // line 41
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->attachLibrary("bootstrap_paragraphs/bp-columns"), "html", null, true);
        echo "
";
        // line 42
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->attachLibrary("bootstrap_paragraphs/bp-columns-two"), "html", null, true);
        echo "

";
        // line 46
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "bp_width", []))) {
            // line 47
            echo "  ";
            $context["layout_width"] = $this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "bp_width", []), "#items", [], "array"), "getString", [], "method");
            // line 48
            echo "  ";
            $context["layout_width_classes"] = [0 => ((("paragraph--width--tiny" ==             // line 49
($context["layout_width"] ?? null))) ? ("paragraph--width--tiny") : ("")), 1 => ((("paragraph--width--narrow" ==             // line 50
($context["layout_width"] ?? null))) ? ("paragraph--width--narrow") : ("")), 2 => ((("paragraph--width--medium" ==             // line 51
($context["layout_width"] ?? null))) ? ("paragraph--width--medium") : ("")), 3 => ((("paragraph--width--wide" ==             // line 52
($context["layout_width"] ?? null))) ? ("paragraph--width--wide") : ("")), 4 => ((("paragraph--width--full" ==             // line 53
($context["layout_width"] ?? null))) ? ("paragraph--width--full") : (""))];
        }
        // line 57
        echo "
";
        // line 60
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "bp_background", []))) {
            // line 61
            echo "  ";
            $context["layout_background"] = $this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "bp_background", []), "#items", [], "array"), "getString", [], "method");
            // line 62
            echo "  ";
            $context["layout_background_classes"] = [0 => ((("paragraph--color paragraph--color--rgba-black-slight" ==             // line 63
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-black-slight") : ("")), 1 => ((("paragraph--color paragraph--color--rgba-black-light" ==             // line 64
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-black-light") : ("")), 2 => ((("paragraph--color paragraph--color--rgba-black-strong" ==             // line 65
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-black-strong") : ("")), 3 => ((("paragraph--color paragraph--color--rgba-blue-slight" ==             // line 66
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-blue-slight") : ("")), 4 => ((("paragraph--color paragraph--color--rgba-blue-light" ==             // line 67
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-blue-light") : ("")), 5 => ((("paragraph--color paragraph--color--rgba-blue-strong" ==             // line 68
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-blue-strong") : ("")), 6 => ((("paragraph--color paragraph--color--rgba-bluegrey-slight" ==             // line 69
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-bluegrey-slight") : ("")), 7 => ((("paragraph--color paragraph--color--rgba-bluegrey-light" ==             // line 70
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-bluegrey-light") : ("")), 8 => ((("paragraph--color paragraph--color--rgba-bluegrey-strong" ==             // line 71
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-bluegrey-strong") : ("")), 9 => ((("paragraph--color paragraph--color--rgba-brown-slight" ==             // line 72
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-brown-slight") : ("")), 10 => ((("paragraph--color paragraph--color--rgba-brown-light" ==             // line 73
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-brown-light") : ("")), 11 => ((("paragraph--color paragraph--color--rgba-brown-strong" ==             // line 74
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-brown-strong") : ("")), 12 => ((("paragraph--color paragraph--color--rgba-cyan-slight" ==             // line 75
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-cyan-slight") : ("")), 13 => ((("paragraph--color paragraph--color--rgba-cyan-light" ==             // line 76
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-cyan-light") : ("")), 14 => ((("paragraph--color paragraph--color--rgba-cyan-strong" ==             // line 77
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-cyan-strong") : ("")), 15 => ((("paragraph--color paragraph--color--rgba-green-slight" ==             // line 78
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-green-slight") : ("")), 16 => ((("paragraph--color paragraph--color--rgba-green-light" ==             // line 79
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-green-light") : ("")), 17 => ((("paragraph--color paragraph--color--rgba-green-strong" ==             // line 80
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-green-strong") : ("")), 18 => ((("paragraph--color paragraph--color--rgba-grey-slight" ==             // line 81
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-grey-slight") : ("")), 19 => ((("paragraph--color paragraph--color--rgba-grey-light" ==             // line 82
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-grey-light") : ("")), 20 => ((("paragraph--color paragraph--color--rgba-grey-strong" ==             // line 83
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-grey-strong") : ("")), 21 => ((("paragraph--color paragraph--color--rgba-indigo-slight" ==             // line 84
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-indigo-slight") : ("")), 22 => ((("paragraph--color paragraph--color--rgba-indigo-light" ==             // line 85
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-indigo-light") : ("")), 23 => ((("paragraph--color paragraph--color--rgba-indigo-strong" ==             // line 86
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-indigo-strong") : ("")), 24 => ((("paragraph--color paragraph--color--rgba-lime-slight" ==             // line 87
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-lime-slight") : ("")), 25 => ((("paragraph--color paragraph--color--rgba-lime-light" ==             // line 88
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-lime-light") : ("")), 26 => ((("paragraph--color paragraph--color--rgba-lime-strong" ==             // line 89
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-lime-strong") : ("")), 27 => ((("paragraph--color paragraph--color--rgba-orange-slight" ==             // line 90
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-orange-slight") : ("")), 28 => ((("paragraph--color paragraph--color--rgba-orange-light" ==             // line 91
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-orange-light") : ("")), 29 => ((("paragraph--color paragraph--color--rgba-orange-strong" ==             // line 92
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-orange-strong") : ("")), 30 => ((("paragraph--color paragraph--color--rgba-pink-slight" ==             // line 93
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-pink-slight") : ("")), 31 => ((("paragraph--color paragraph--color--rgba-pink-light" ==             // line 94
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-pink-light") : ("")), 32 => ((("paragraph--color paragraph--color--rgba-pink-strong" ==             // line 95
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-pink-strong") : ("")), 33 => ((("paragraph--color paragraph--color--rgba-purple-slight" ==             // line 96
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-purple-slight") : ("")), 34 => ((("paragraph--color paragraph--color--rgba-purple-light" ==             // line 97
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-purple-light") : ("")), 35 => ((("paragraph--color paragraph--color--rgba-purple-strong" ==             // line 98
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-purple-strong") : ("")), 36 => ((("paragraph--color paragraph--color--rgba-red-slight" ==             // line 99
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-red-slight") : ("")), 37 => ((("paragraph--color paragraph--color--rgba-red-light" ==             // line 100
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-red-light") : ("")), 38 => ((("paragraph--color paragraph--color--rgba-red-strong" ==             // line 101
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-red-strong") : ("")), 39 => ((("paragraph--color paragraph--color--rgba-stylish-slight" ==             // line 102
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-stylish-slight") : ("")), 40 => ((("paragraph--color paragraph--color--rgba-stylish-light" ==             // line 103
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-stylish-light") : ("")), 41 => ((("paragraph--color paragraph--color--rgba-stylish-strong" ==             // line 104
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-stylish-strong") : ("")), 42 => ((("paragraph--color paragraph--color--rgba-teal-slight" ==             // line 105
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-teal-slight") : ("")), 43 => ((("paragraph--color paragraph--color--rgba-teal-light" ==             // line 106
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-teal-light") : ("")), 44 => ((("paragraph--color paragraph--color--rgba-teal-strong" ==             // line 107
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-teal-strong") : ("")), 45 => ((("paragraph--color paragraph--color--rgba-white-slight" ==             // line 108
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-white-slight") : ("")), 46 => ((("paragraph--color paragraph--color--rgba-white-light" ==             // line 109
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-white-light") : ("")), 47 => ((("paragraph--color paragraph--color--rgba-white-strong" ==             // line 110
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-white-strong") : ("")), 48 => ((("paragraph--color paragraph--color--rgba-yellow-slight" ==             // line 111
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-yellow-slight") : ("")), 49 => ((("paragraph--color paragraph--color--rgba-yellow-light" ==             // line 112
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-yellow-light") : ("")), 50 => ((("paragraph--color paragraph--color--rgba-yellow-strong" ==             // line 113
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-yellow-strong") : ("")), 51 => ((("paragraph--color--transparent" ==             // line 114
($context["layout_background"] ?? null))) ? ("paragraph--color--transparent") : ("")), 52 => ((("paragraph--color paragraph--color--primary" ==             // line 115
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--primary") : ("")), 53 => ((("paragraph--color paragraph--color--secondary" ==             // line 116
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--secondary") : ("")), 54 => ((("paragraph--color paragraph--color--success" ==             // line 117
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--success") : ("")), 55 => ((("paragraph--color paragraph--color--info" ==             // line 118
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--info") : ("")), 56 => ((("paragraph--color paragraph--color--warning" ==             // line 119
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--warning") : ("")), 57 => ((("paragraph--color paragraph--color--danger" ==             // line 120
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--danger") : (""))];
        }
        // line 124
        echo "
";
        // line 127
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "bp_column_style_2", []))) {
            // line 128
            echo "  ";
            $context["column_style_2"] = $this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "bp_column_style_2", []), "#items", [], "array"), "getString", [], "method");
            // line 129
            echo "  ";
            $context["column_style_2_classes"] = [0 => ((("paragraph--style--75-25" ==             // line 130
($context["column_style_2"] ?? null))) ? ("paragraph--style--75-25") : ("")), 1 => ((("paragraph--style--66-33" ==             // line 131
($context["column_style_2"] ?? null))) ? ("paragraph--style--66-33") : ("")), 2 => ((("paragraph--style--25-75" ==             // line 132
($context["column_style_2"] ?? null))) ? ("paragraph--style--25-75") : ("")), 3 => ((("paragraph--style--33-66" ==             // line 133
($context["column_style_2"] ?? null))) ? ("paragraph--style--33-66") : (""))];
        }
        // line 137
        echo "
";
        // line 141
        $context["classes"] = [0 => "paragraph", 1 => ("paragraph--type--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 143
($context["paragraph"] ?? null), "bundle", [])))), 2 => ((        // line 144
($context["view_mode"] ?? null)) ? (("paragraph--view-mode--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["view_mode"] ?? null))))) : ("")), 3 => ("paragraph--id--" . $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(        // line 145
($context["paragraph"] ?? null), "id", []), "value", [])))];
        // line 148
        echo "
";
        // line 150
        $context["width_field"] = $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "bp_width", [])));
        // line 151
        if (($context["width_field"] ?? null)) {
            // line 152
            echo "  ";
            $context["classes"] = twig_array_merge($this->sandbox->ensureToStringAllowed(($context["classes"] ?? null)), $this->sandbox->ensureToStringAllowed(($context["layout_width_classes"] ?? null)));
        }
        // line 154
        echo "
";
        // line 156
        $context["background_field"] = $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "bp_background", [])));
        // line 157
        if (($context["background_field"] ?? null)) {
            // line 158
            echo "  ";
            $context["classes"] = twig_array_merge($this->sandbox->ensureToStringAllowed(($context["classes"] ?? null)), $this->sandbox->ensureToStringAllowed(($context["layout_background_classes"] ?? null)));
        }
        // line 160
        echo "
";
        // line 162
        $context["column_style_field"] = $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "bp_column_style_2", [])));
        // line 163
        if (($context["column_style_field"] ?? null)) {
            // line 164
            echo "  ";
            $context["classes"] = twig_array_merge($this->sandbox->ensureToStringAllowed(($context["classes"] ?? null)), $this->sandbox->ensureToStringAllowed(($context["column_style_2_classes"] ?? null)));
        }
        // line 166
        echo "
";
        // line 168
        echo "<div";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method")), "html", null, true);
        echo ">
  <div class=\"paragraph__column\">
    ";
        // line 170
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "bp_header", []))) {
            // line 171
            echo "      <h2>";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "bp_header", [])), "html", null, true);
            echo "</h2>
    ";
        }
        // line 173
        echo "    ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->withoutFilter($this->sandbox->ensureToStringAllowed(($context["content"] ?? null)), "bp_background", "bp_header", "bp_column_style_2", "bp_width"), "html", null, true);
        echo "
  </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "modules/contrib/bootstrap_paragraphs/templates/paragraph--bp-columns-two-uneven.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  229 => 173,  223 => 171,  221 => 170,  215 => 168,  212 => 166,  208 => 164,  206 => 163,  204 => 162,  201 => 160,  197 => 158,  195 => 157,  193 => 156,  190 => 154,  186 => 152,  184 => 151,  182 => 150,  179 => 148,  177 => 145,  176 => 144,  175 => 143,  174 => 141,  171 => 137,  168 => 133,  167 => 132,  166 => 131,  165 => 130,  163 => 129,  160 => 128,  158 => 127,  155 => 124,  152 => 120,  151 => 119,  150 => 118,  149 => 117,  148 => 116,  147 => 115,  146 => 114,  145 => 113,  144 => 112,  143 => 111,  142 => 110,  141 => 109,  140 => 108,  139 => 107,  138 => 106,  137 => 105,  136 => 104,  135 => 103,  134 => 102,  133 => 101,  132 => 100,  131 => 99,  130 => 98,  129 => 97,  128 => 96,  127 => 95,  126 => 94,  125 => 93,  124 => 92,  123 => 91,  122 => 90,  121 => 89,  120 => 88,  119 => 87,  118 => 86,  117 => 85,  116 => 84,  115 => 83,  114 => 82,  113 => 81,  112 => 80,  111 => 79,  110 => 78,  109 => 77,  108 => 76,  107 => 75,  106 => 74,  105 => 73,  104 => 72,  103 => 71,  102 => 70,  101 => 69,  100 => 68,  99 => 67,  98 => 66,  97 => 65,  96 => 64,  95 => 63,  93 => 62,  90 => 61,  88 => 60,  85 => 57,  82 => 53,  81 => 52,  80 => 51,  79 => 50,  78 => 49,  76 => 48,  73 => 47,  71 => 46,  66 => 42,  62 => 41,  58 => 40,  55 => 39,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "modules/contrib/bootstrap_paragraphs/templates/paragraph--bp-columns-two-uneven.html.twig", "/var/www/pendeedus.mindimage.net/web/modules/contrib/bootstrap_paragraphs/templates/paragraph--bp-columns-two-uneven.html.twig");
    }
}
